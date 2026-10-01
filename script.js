// Interactive Javascript for Ranjith Pachamuthu Portfolio

document.addEventListener('DOMContentLoaded', () => {
  // 1. 3D Perspective Tilt on Mouse Movement for Avatar Card
  const avatarWrapper = document.getElementById('avatar-3d-wrapper');
  const tiltCard = document.getElementById('avatar-tilt-card');

  if (avatarWrapper && tiltCard) {
    avatarWrapper.addEventListener('mousemove', (e) => {
      const rect = avatarWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -12; // tilt angle
      const rotateY = ((x - centerX) / centerX) * 12;

      tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      tiltCard.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2 + 15}px 30px rgba(6, 182, 212, 0.2)`;
    });

    avatarWrapper.addEventListener('mouseleave', () => {
      tiltCard.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
      tiltCard.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.5)';
    });
  }

  // 2. Toggle between 2.5D Vector Art and Real Photo
  const toggleBtn = document.getElementById('avatar-toggle-btn');
  const toggleText = document.getElementById('avatar-toggle-text');
  const vectorImg = document.getElementById('avatar-img-vector');
  const photoImg = document.getElementById('avatar-img-photo');

  let showingVector = true;

  if (toggleBtn && vectorImg && photoImg) {
    toggleBtn.addEventListener('click', () => {
      showingVector = !showingVector;
      if (showingVector) {
        vectorImg.classList.remove('hidden');
        photoImg.classList.add('hidden');
        if (toggleText) toggleText.textContent = 'Show Real Photo';
      } else {
        vectorImg.classList.add('hidden');
        photoImg.classList.remove('hidden');
        if (toggleText) toggleText.textContent = 'Show 2.5D Vector';
      }
    });
  }

  // 3. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 4. Project Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.classList.add('text-slate-400');
      });

      btn.classList.add('active');
      btn.classList.remove('text-slate-400');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.25s ease';
            card.style.opacity = '1';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Copy Email to Clipboard
  const copyBtn = document.getElementById('copy-email-btn');
  const copyBtnText = document.getElementById('copy-btn-text');
  const toast = document.getElementById('toast');
  const emailToCopy = 'ranjithpachamuthu003@gmail.com';

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailToCopy);
        if (copyBtnText) copyBtnText.textContent = 'Copied!';
        if (toast) {
          toast.classList.remove('translate-y-20', 'opacity-0');
          toast.classList.add('translate-y-0', 'opacity-100');
          setTimeout(() => {
            toast.classList.add('translate-y-20', 'opacity-0');
            toast.classList.remove('translate-y-0', 'opacity-100');
            if (copyBtnText) copyBtnText.textContent = 'Copy';
          }, 3000);
        }
      } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = emailToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        if (copyBtnText) copyBtnText.textContent = 'Copied!';
        setTimeout(() => {
          if (copyBtnText) copyBtnText.textContent = 'Copy';
        }, 2000);
      }
    });
  }

  // 6. Neural Stream Particle Canvas Background
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 28000), 45);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.radius = Math.random() * 1.4 + 0.6;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.1 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  }
});
