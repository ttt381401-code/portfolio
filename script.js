/**
 * Sunisa Saelim - Personal Portfolio Interactive Logic
 * Modern, Responsive, Fluid Animations & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Navigation & Scroll Spy
  // ==========================================
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('backToTop');
  const sections = document.querySelectorAll('section[id]');

  // Sticky Navbar & Back-to-Top on Scroll
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar blur/shrink
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // Active Nav Link Spy
    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Hamburger Menu Toggle
  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  // Close Mobile Menu on Nav Item Click
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });

  // ==========================================
  // 2. Scroll-Triggered Animations
  // ==========================================
  const animateElements = document.querySelectorAll('.animate-on-scroll');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15,
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach((el) => scrollObserver.observe(el));

  // ==========================================
  // 3. Portfolio Category Filtering
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-tab-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Active state on buttons
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach((item) => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // ==========================================
  // 4. Portfolio Projects Data & Modal Popup
  // ==========================================
  const projectDatabase = {
    p1: {
      category: 'Graphic Design',
      title: 'ชุดสื่อโฆษณาและอัตลักษณ์แบรนด์ Pastel Glow Skincare',
      bgClass: 'mockup-graphic-1',
      icon: 'ri-palette-line',
      shortDesc: 'การออกแบบภาพลักษณ์แบรนด์และสื่อคอนเทนต์โฆษณาออนไลน์สำหรับธุรกิจสกินแคร์ยุคใหม่',
      fullDesc: `โปรเจกต์นี้เป็นการออกแบบอัตลักษณ์แบรนด์ (Brand Identity) แบบครบวงจรสำหรับผลิตภัณฑ์สกินแคร์ธรรมชาติ ประกอบด้วยการกำหนด Mood & Tone, การเลือก Color Palette โทนพาสเทลที่ให้ความรู้สึกอ่อนโยน สะอาด และพรีเมียม รวมถึงการออกแบบสื่อโปรโมทบน Social Media (Instagram Carousel, Facebook Post, TikTok Cover) ที่ช่วยเพิ่มยอด Engagement และความน่าเชื่อถือให้กับแบรนด์`,
      duration: '3 สัปดาห์',
      tools: ['Canva Pro', 'Figma', 'Adobe Photoshop', 'CapCut'],
      role: 'Lead Graphic & Visual Designer',
      highlights: [
        'ออกแบบชุดสีและ Typographic Guideline ประจำแบรนด์',
        'สร้างสรรค์ Template สื่อโซเชียลมีเดียกว่า 15 รูปแบบ',
        'ออกแบบแพ็กเกจจิ้งและ Mockup สินค้า 3 มิติเสมือนจริง'
      ]
    },
    p2: {
      category: 'Website Design & Development',
      title: 'เว็บไซต์คาเฟ่และเบเกอรี่ Sweet Blossom Bakery',
      bgClass: 'mockup-web-1',
      icon: 'ri-layout-masonry-line',
      shortDesc: 'การออกแบบและพัฒนาเว็บไซต์คาเฟ่สไตล์โมเดิร์นมินิมอล พร้อมระบบสั่งของหวานออนไลน์',
      fullDesc: `ออกแบบ User Interface (UI) และ User Experience (UX) สำหรับร้านคาเฟ่ Sweet Blossom โดยเน้นความเรียบง่าย สบายตา ใช้งานสะดวกบนสมาร์ทโฟน มีระบบแสดงเมนูขนมและเครื่องดื่มพร้อมราคา ระบบจองโต๊ะ และการสั่งซื้อล่วงหน้าเพื่อรับที่หน้าร้าน พร้อมเชื่อมต่อ Google Maps เพื่ออำนวยความสะดวกให้ลูกค้า`,
      duration: '4 สัปดาห์',
      tools: ['HTML5 / CSS3', 'JavaScript', 'Figma', 'WordPress / WooCommerce'],
      role: 'UI/UX Designer & Web Developer',
      highlights: [
        'Responsive Design 100% รองรับมือถือ แท็บเล็ต และคอมพิวเตอร์',
        'ออกแบบกระบวนการสั่งซื้อให้เสร็จสิ้นได้ใน 3 ขั้นตอน (Seamless Checkout)',
        'คะแนน Google PageSpeed Insights ระดับ 95+'
      ]
    },
    p3: {
      category: 'E-Commerce Platform',
      title: 'ร้านค้าออนไลน์เสื้อผ้าแฟชั่น Modern Chic',
      bgClass: 'mockup-ecom-1',
      icon: 'ri-shopping-bag-3-line',
      shortDesc: 'ระบบร้านค้า E-Commerce เต็มรูปแบบ มีระบบตัดสต็อก ระบบชำระเงิน และตะกร้าสินค้า',
      fullDesc: `จัดทำแพลตฟอร์มร้านค้าออนไลน์สำหรับแบรนด์แฟชั่นเสื้อผ้ายุคใหม่ โดยวางระบบหมวดหมู่สินค้า ค้นหาและคัดกรองตามไซส์/สี ระบบตะกร้าสินค้าแบบ Real-time เชื่อมต่อระบบชำระเงินผ่าน PromptPay และบัตรเครดิต พร้อมระบบจัดการคำสั่งซื้อและออกใบเสร็จอัตโนมัติสำหรับแอดมินหลังบ้าน`,
      duration: '5 สัปดาห์',
      tools: ['WooCommerce', 'WordPress', 'PromptPay Gateway', 'Canva'],
      role: 'E-Commerce Specialist & System Setup',
      highlights: [
        'ระบบจัดการสินค้าคงคลัง (Stock Management) อัตโนมัติ',
        'แจ้งเตือนยอดคำสั่งซื้อเข้าผ่าน LINE Notify',
        'ระบบคูปองส่วนลดและโปรโมชั่น Flash Sale'
      ]
    },
    p4: {
      category: 'Database & Data Analytics',
      title: 'ระบบฐานข้อมูลจัดการสต็อกสินค้าและยอดขายร้านค้าปลีก',
      bgClass: 'mockup-data-1',
      icon: 'ri-database-2-line',
      shortDesc: 'ออกแบบฐานข้อมูลจำลองสำหรับบริหารสินค้าคงคลังและแดชบอร์ดสรุปผลประกอบการ',
      fullDesc: `โครงงานออกแบบและพัฒนาระบบจัดเก็บข้อมูลสินค้า (Inventory Database) สำหรับร้านค้าปลีก โดยใช้แบบจำลอง Entity-Relationship Diagram (ERD), ตารางฐานข้อมูลเชิงสัมพันธ์ (Relational DB) พร้อมสร้าง Dashboard บน Microsoft Excel และ Google Looker Studio เพื่อสรุปยอดขายสินค้าขายดี สถิติกำไร-ขาดทุน และแจ้งเตือนสินค้าใกล้หมดสต็อก`,
      duration: '3 สัปดาห์',
      tools: ['Microsoft Excel (VLOOKUP, PivotTable, Dashboard)', 'SQL / MySQL', 'Google Looker Studio'],
      role: 'Database Designer & Data Analyst',
      highlights: [
        'โครงสร้างฐานข้อมูลที่มีความกระชับ ไม่ซ้ำซ้อน (Database Normalization)',
        'Interactive Dashboard สำหรับผู้บริหารดูสถิติได้ในหน้าเดียว',
        'สูตรคำนวณและแจ้งเตือน Reorder Point อัตโนมัติ'
      ]
    },
    p5: {
      category: 'Digital Marketing Campaign',
      title: 'แคมเปญการตลาดดิจิทัล Summer Flash Sale 2026',
      bgClass: 'mockup-market-1',
      icon: 'ri-megaphone-line',
      shortDesc: 'วางแผนกลยุทธ์คอนเทนต์ ยิงโฆษณาบน Social Media และวิเคราะห์ผลตอบรับ',
      fullDesc: `แคมเปญการตลาดดิจิทัลที่ผสมผสานทั้ง Inbound และ Outbound Marketing ได้แก่ การผลิตวิดีโอสั้นแบบ Viral Content บน TikTok, การยิงโฆษณา Facebook Ads ที่กำหนดกลุ่มเป้าหมายเชิงลึกตามความสนใจ และการสื่อสารผ่าน LINE Official Account เพื่อกระตุ้นยอดขายช่วงฤดูร้อน`,
      duration: '2 สัปดาห์',
      tools: ['Facebook Ads Manager', 'TikTok for Business', 'LINE OA', 'CapCut'],
      role: 'Content Creator & Ads Strategist',
      highlights: [
        'ยอดการเข้าถึง (Reach) เติบโตขึ้น 150% ภายใน 14 วัน',
        'ค่า Return on Ad Spend (ROAS) สูงถึง 3.8x',
        'เพิ่มฐานผู้ติดตาม LINE OA ใหม่กว่า 800 คน'
      ]
    },
    p6: {
      category: 'AI Projects & Innovation',
      title: 'เวิร์กโฟลว์ AI ช่วยสร้างสรรค์คอนเทนต์การตลาดแบบครบวงจร',
      bgClass: 'mockup-ai-1',
      icon: 'ri-robot-2-line',
      shortDesc: 'ประยุกต์ใช้ Prompt Engineering และ Generative AI เพิ่มประสิทธิภาพการผลิตสื่อดิจิทัล',
      fullDesc: `การสร้างกระบวนการทำงานอัจฉริยะ (AI-Powered Content Workflow) โดยออกแบบชุดคำสั่ง (Prompts Library) สำหรับ ChatGPT ในการคิดหัวข้อคอนเทนต์ เขียน Copywriting สำหรับแคปชันขายสินค้า และใช้ AI Image Tools ช่วยสร้างรูปภาพม็อกอัปประกอบบทความ ทำให้ลดเวลาการผลิตสื่อลงถึง 70% โดยยังคงรักษาคุณภาพและความเป็นเอกลักษณ์ของแบรนด์`,
      duration: '2 สัปดาห์',
      tools: ['ChatGPT / Claude', 'Prompt Engineering', 'Midjourney / Canva AI', 'Notion'],
      role: 'AI Workflow Designer & Prompt Engineer',
      highlights: [
        'คู่มือ Prompt Library กว่า 30 รูปแบบพร้อมใช้งาน',
        'ลดเวลาผลิตคอนเทนต์ประจำสัปดาห์จาก 8 ชม. เหลือเพียง 2.5 ชม.',
        'ยกระดับคุณภาพชิ้นงานและความหลากหลายของไอเดีย'
      ]
    }
  };

  const modal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const viewProjectBtns = document.querySelectorAll('.view-project-btn');

  // Open Modal
  viewProjectBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pId = btn.getAttribute('data-project-id');
      const project = projectDatabase[pId];

      if (project) {
        modalBody.innerHTML = `
          <div class="modal-header-tag"><i class="${project.icon}"></i> ${project.category}</div>
          <h2 class="modal-project-title">${project.title}</h2>
          
          <div class="modal-banner-mockup ${project.bgClass}">
            <i class="${project.icon} text-gradient"></i>
          </div>

          <p class="modal-desc">${project.fullDesc}</p>

          <div class="modal-details-grid">
            <div class="modal-detail-item">
              <span class="md-label">บทบาทหน้าที่</span>
              <span class="md-val">${project.role}</span>
            </div>
            <div class="modal-detail-item">
              <span class="md-label">ระยะเวลาจัดทำ</span>
              <span class="md-val">${project.duration}</span>
            </div>
          </div>

          <h4 style="font-size: 0.95rem; margin-bottom: 8px; color: var(--text-main);">
            <i class="ri-checkbox-circle-line text-pink"></i> จุดเด่นและผลลัพธ์ของโปรเจกต์:
          </h4>
          <ul class="task-list" style="margin-bottom: 20px;">
            ${project.highlights.map((h) => `<li><i class="ri-check-double-line text-purple"></i> ${h}</li>`).join('')}
          </ul>

          <h4 style="font-size: 0.95rem; margin-bottom: 10px; color: var(--text-main);">
            <i class="ri-tools-line text-pink"></i> เครื่องมือและเทคโนโลยีที่ใช้:
          </h4>
          <div class="modal-tech-stack">
            ${project.tools.map((t) => `<span class="skill-pill">${t}</span>`).join('')}
          </div>

          <div class="modal-actions" style="margin-top: 24px;">
            <a href="#contact" class="btn btn-primary" id="modalContactBtn">
              <i class="ri-chat-smile-2-line"></i> สนใจผลงาน / ติดต่อสอบถาม
            </a>
          </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Bind contact button inside modal
        const modalContactBtn = document.getElementById('modalContactBtn');
        if (modalContactBtn) {
          modalContactBtn.addEventListener('click', () => {
            closeModal();
          });
        }
      }
    });
  });

  // Close Modal Function
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  modalCloseBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // ==========================================
  // 5. Interactive Contact Form with Validation
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');

  function showToast(message, duration = 3500) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('userName');
      const emailInput = document.getElementById('userEmail');
      const msgInput = document.getElementById('userMessage');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        nameInput.parentElement.classList.remove('has-error');
      }

      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailPattern.test(emailInput.value.trim())) {
        emailInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        emailInput.parentElement.classList.remove('has-error');
      }

      // Validate Message
      if (!msgInput.value.trim()) {
        msgInput.parentElement.classList.add('has-error');
        isValid = false;
      } else {
        msgInput.parentElement.classList.remove('has-error');
      }

      if (isValid) {
        const submitBtn = document.getElementById('submitBtn');
        const originalBtnHTML = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <i class="ri-loader-4-line ri-spin"></i>
          <span>กำลังส่งข้อความ...</span>
        `;

        // Simulate fast server response
        setTimeout(() => {
          showToast(`ขอบคุณค่ะ คุณ ${nameInput.value.trim()}! สุนิสาได้รับข้อความแล้วและจะติดต่อกลับโดยเร็วค่ะ ✨`);
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
        }, 1000);
      }
    });

    // Real-time input error removal
    contactForm.querySelectorAll('input, textarea').forEach((field) => {
      field.addEventListener('input', () => {
        field.parentElement.classList.remove('has-error');
      });
    });
  }

  // ==========================================
  // 6. Copy to Clipboard Feature
  // ==========================================
  const copyButtons = document.querySelectorAll('.btn-copy, .copyable-text');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`📋 คัดลอก "${textToCopy}" ลงในคลิปบอร์ดแล้วค่ะ!`);
        }).catch(() => {
          showToast(`อีเมล: ${textToCopy}`);
        });
      }
    });
  });

  // ==========================================
  // 7. Interactive Profile Photo Customizer
  // ==========================================
  const avatarFileInput = document.getElementById('avatarFileInput');
  const profileImageBox = document.getElementById('profileImageBox');

  if (avatarFileInput && profileImageBox) {
    avatarFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          // Replace SVG with real photo
          profileImageBox.innerHTML = `
            <img src="${event.target.result}" alt="สุนิสา แซ่ลิ่ม" style="width: 100%; height: 100%; object-fit: cover; border-radius: 24px;">
            <div class="photo-upload-overlay" style="bottom: 12px;">
              <button type="button" class="upload-trigger-btn" id="resetPhotoBtn">
                <i class="ri-refresh-line"></i>
                <span>รีเซ็ตเป็นรูปวาด</span>
              </button>
            </div>
          `;
          showToast('📸 อัปเดตรูปโปรไฟล์จริงเรียบร้อยแล้วค่ะ!');

          // Reset button listener
          const resetBtn = document.getElementById('resetPhotoBtn');
          if (resetBtn) {
            resetBtn.addEventListener('click', () => {
              window.location.reload();
            });
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }
});
