import { auth, onAuthStateChanged, signOut } from "./firebase-contact.js";
import { updatePassword } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


// Navbar mobile pada halaman akun (halaman ini tidak memuat script.js).
if (/\\/akun\\/?$/.test(window.location.pathname)) {
  const mobileButton = document.querySelector(".menu-btn");
  const mobileMenu = document.querySelector(".nav-menu");
  if (mobileButton && mobileMenu) {
    mobileButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
      mobileButton.innerHTML = mobileMenu.classList.contains("active")
        ? '<i class="fas fa-xmark"></i>'
        : '<i class="fas fa-bars"></i>';
    });
  }
}

const slot = document.getElementById("accountMenuSlot");
if (slot) {
  slot.innerHTML = `
    <div class="account-dropdown">
      <button type="button" class="account-trigger" id="accountTrigger" aria-expanded="false">
        <i class="fas fa-user"></i>
        <span id="accountTriggerName">Akun</span>
        <i class="fas fa-chevron-down account-chevron"></i>
      </button>
      <div class="account-dropdown-panel" id="accountDropdownPanel" hidden>
        <a href="#" id="aboutAccountLink"><i class="fas fa-id-card"></i> Tentang Akun</a>
        <button type="button" id="changePasswordOpen"><i class="fas fa-key"></i> Ganti Password</button>
        <button type="button" id="accountLogout"><i class="fas fa-right-from-bracket"></i> Logout</button>
        <a href="../akun/" id="accountLoginLink" hidden><i class="fas fa-right-to-bracket"></i> Login / Daftar</a>
      </div>
    </div>
  `;

  const trigger = document.getElementById("accountTrigger");
  const panel = document.getElementById("accountDropdownPanel");
  const name = document.getElementById("accountTriggerName");
  const about = document.getElementById("aboutAccountLink");
  const changeOpen = document.getElementById("changePasswordOpen");
  const logout = document.getElementById("accountLogout");
  const loginLink = document.getElementById("accountLoginLink");
  const isNested = /\\/(tentang|menu|kontak|pembayaran|akun)\\/?$/.test(window.location.pathname);
  loginLink.href = isNested ? "../akun/" : "akun/";

  const closePanel = () => {
    panel.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
  };

  trigger.addEventListener("click", () => {
    panel.hidden = !panel.hidden;
    trigger.setAttribute("aria-expanded", String(!panel.hidden));
  });

  document.addEventListener("click", event => {
    if (!slot.contains(event.target)) closePanel();
  });

  onAuthStateChanged(auth, user => {
    name.textContent = user ? (user.displayName || user.email?.split("@")[0] || "Customer") : "Akun";
    about.hidden = !user;
    changeOpen.hidden = !user;
    logout.hidden = !user;
    loginLink.hidden = !!user;
  });

  about.addEventListener("click", event => {
    event.preventDefault();
    const user = auth.currentUser;
    if (!user) return;
    alert(`Nama: ${user.displayName || "-"}\nEmail: ${user.email || "-"}`);
    closePanel();
  });

  changeOpen.addEventListener("click", () => {
    closePanel();
    let box = document.getElementById("accountPasswordBox");
    if (!box) {
      box = document.createElement("div");
      box.id = "accountPasswordBox";
      box.className = "account-password-box";
      box.innerHTML = `
        <form id="accountPasswordForm">
          <h3>Ganti Password</h3>
          <p>Masukkan password baru (minimal 6 karakter).</p>
          <input id="accountNewPassword" type="password" minlength="6" autocomplete="new-password" placeholder="Password baru" required>
          <input id="accountConfirmPassword" type="password" minlength="6" autocomplete="new-password" placeholder="Ulangi password baru" required>
          <p id="accountPasswordMessage" role="status"></p>
          <div class="account-password-actions">
            <button type="submit">Simpan Password</button>
            <button type="button" id="accountPasswordCancel">Batal</button>
          </div>
        </form>`;
      document.body.appendChild(box);
      box.querySelector("#accountPasswordCancel").addEventListener("click", () => box.remove());
      box.querySelector("#accountPasswordForm").addEventListener("submit", async event => {
        event.preventDefault();
        const user = auth.currentUser;
        const pass = box.querySelector("#accountNewPassword").value;
        const confirm = box.querySelector("#accountConfirmPassword").value;
        const msg = box.querySelector("#accountPasswordMessage");
        if (pass.length < 6) { msg.textContent = "Password minimal 6 karakter."; return; }
        if (pass !== confirm) { msg.textContent = "Konfirmasi password tidak sama."; return; }
        try {
          await updatePassword(user, pass);
          msg.textContent = "Password berhasil diganti.";
          msg.style.color = "#218838";
          setTimeout(() => box.remove(), 1400);
        } catch (error) {
          console.error(error);
          msg.textContent = error.code === "auth/requires-recent-login"
            ? "Demi keamanan, silakan logout dan login kembali sebelum mengganti password."
            : "Password gagal diganti. Silakan coba lagi.";
          msg.style.color = "#c0392b";
        }
      });
    }
  });

  logout.addEventListener("click", async () => {
    try {
      await signOut(auth);
      closePanel();
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Logout gagal. Silakan coba lagi.");
    }
  });
}
