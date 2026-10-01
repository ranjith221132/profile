// Linear / Raycast Obsidian Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  const emailToCopy = 'ranjithpachamuthu003@gmail.com';

  // 1. Toast Notification Helper
  const toast = document.getElementById('linear-toast');
  const toastMsg = document.getElementById('linear-toast-msg');

  function showToast(message) {
    if (toast && toastMsg) {
      toastMsg.textContent = message;
      toast.classList.remove('translate-y-20', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
      setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
        toast.classList.remove('translate-y-0', 'opacity-100');
      }, 2500);
    }
  }

  async function copyEmailAction() {
    try {
      await navigator.clipboard.writeText(emailToCopy);
      showToast('Email copied: ' + emailToCopy);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = emailToCopy;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showToast('Email copied: ' + emailToCopy);
    }
  }

  // Copy Buttons
  const heroCopyBtn = document.getElementById('hero-copy-email');
  const footerCopyBtn = document.getElementById('footer-copy-btn');
  const cmdCopyBtn = document.getElementById('cmd-copy-email');

  if (heroCopyBtn) heroCopyBtn.addEventListener('click', copyEmailAction);
  if (footerCopyBtn) footerCopyBtn.addEventListener('click', copyEmailAction);
  if (cmdCopyBtn) {
    cmdCopyBtn.addEventListener('click', () => {
      copyEmailAction();
      closeCmdPalette();
    });
  }

  // 2. Raycast / Linear Command Palette (Cmd+K / Ctrl+K)
  const cmdModal = document.getElementById('cmd-palette-backdrop');
  const openCmdBtn = document.getElementById('open-cmd-btn');
  const cmdInput = document.getElementById('cmd-input');
  const cmdItems = document.querySelectorAll('.cmd-item');

  function openCmdPalette() {
    if (cmdModal) {
      cmdModal.classList.remove('hidden');
      if (cmdInput) {
        cmdInput.value = '';
        setTimeout(() => cmdInput.focus(), 50);
      }
    }
  }

  function closeCmdPalette() {
    if (cmdModal) {
      cmdModal.classList.add('hidden');
    }
  }

  if (openCmdBtn) openCmdBtn.addEventListener('click', openCmdPalette);

  // Global Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdModal && cmdModal.classList.contains('hidden')) {
        openCmdPalette();
      } else {
        closeCmdPalette();
      }
    } else if (e.key === 'Escape') {
      closeCmdPalette();
    }
  });

  if (cmdModal) {
    cmdModal.addEventListener('click', (e) => {
      if (e.target === cmdModal) closeCmdPalette();
    });
  }

  // Command palette navigation items
  cmdItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('data-target');
      if (targetId) {
        const el = document.querySelector(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
      closeCmdPalette();
    });
  });

  // Filter command list by search input
  if (cmdInput) {
    cmdInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const allButtons = document.querySelectorAll('#cmd-list button, #cmd-list a');
      allButtons.forEach(btn => {
        const text = btn.textContent.toLowerCase();
        if (text.includes(query)) {
          btn.style.display = 'flex';
        } else {
          btn.style.display = 'none';
        }
      });
    });
  }

  // 3. Project Filter Tabs
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.linear-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('active', 'text-white', 'bg-[#171b23]', 'border-[#222834]');
        t.classList.add('text-slate-400', 'bg-[#0c0e12]', 'border-[#1e2430]');
      });

      tab.classList.add('active', 'text-white', 'bg-[#171b23]', 'border-[#222834]');
      tab.classList.remove('text-slate-400', 'bg-[#0c0e12]', 'border-[#1e2430]');

      const filterVal = tab.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Avatar Image Toggle (2.5D Vector <-> Photo)
  const toggleAvatarBtn = document.getElementById('toggle-avatar-style');
  const avatarVector = document.getElementById('obsidian-avatar-vector');
  const avatarPhoto = document.getElementById('obsidian-avatar-photo');

  let isVector = true;
  if (toggleAvatarBtn && avatarVector && avatarPhoto) {
    toggleAvatarBtn.addEventListener('click', () => {
      isVector = !isVector;
      if (isVector) {
        avatarVector.classList.remove('hidden');
        avatarPhoto.classList.add('hidden');
        toggleAvatarBtn.textContent = 'Toggle Photo';
      } else {
        avatarVector.classList.add('hidden');
        avatarPhoto.classList.remove('hidden');
        toggleAvatarBtn.textContent = 'Toggle 2.5D Vector';
      }
    });
  }

  // 5. Mobile Drawer Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
});
