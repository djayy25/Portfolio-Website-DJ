document.addEventListener('DOMContentLoaded', () => {
    // Navigation underline code
    const navMenu = document.getElementById('nav-menu');
    const navLinks = navMenu.querySelectorAll('a');
    const navUnderline = navMenu.querySelector('.nav-underline');

    function setUnderline(element) {
        const rect = element.getBoundingClientRect();
        const navRect = navMenu.getBoundingClientRect();
        navUnderline.style.width = rect.width + 'px';
        navUnderline.style.left = (rect.left - navRect.left) + 'px';
    }

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            setUnderline(link);
        });
    });

    navMenu.addEventListener('mouseleave', () => {
        navUnderline.style.width = '0';
    });

    // Dynamic content loading from XML
    fetch('/static/data/data.xml')
        .then(response => response.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(data => {
            // Home section
            const home = data.querySelector('home');
            if (home) {
                document.getElementById('full-name').textContent = home.querySelector('fullname')?.textContent || '';
                document.getElementById('profile-photo').src = home.querySelector('profilephoto')?.textContent || '';
                document.getElementById('tagline').textContent = home.querySelector('tagline')?.textContent || '';
                document.getElementById('location').textContent = home.querySelector('location')?.textContent || '';

                const socialMediaLinks = document.getElementById('social-media-links');
                socialMediaLinks.innerHTML = '';
                const socialmedia = home.querySelector('socialmedia');
                if (socialmedia) {
                    const facebook = socialmedia.querySelector('facebook')?.textContent;
                    const instagram = socialmedia.querySelector('instagram')?.textContent;
                    const twitter = socialmedia.querySelector('twitter')?.textContent;
                    if (facebook) socialMediaLinks.innerHTML += `<a href="${facebook}" target="_blank" rel="noopener noreferrer" class="social-button facebook" aria-label="Facebook"><img src="/static/images/facebook.png" alt="Facebook" /></a> `;
                    if (instagram) socialMediaLinks.innerHTML += `<a href="${instagram}" target="_blank" rel="noopener noreferrer" class="social-button instagram" aria-label="Instagram"><img src="/static/images/insta.png" alt="Instagram" /></a> `;
                    if (twitter) socialMediaLinks.innerHTML += `<a href="${twitter}" target="_blank" rel="noopener noreferrer" class="social-button twitter" aria-label="Twitter"><img src="/static/images/twitter.png" alt="Twitter" /></a>`;
                }
                
                // if (socialmedia) {
                //     const facebook = socialmedia.querySelector('facebook')?.textContent;
                //     const instagram = socialmedia.querySelector('instagram')?.textContent;
                //     const twitter = socialmedia.querySelector('twitter')?.textContent;
                //     if (facebook) socialMediaLinks.innerHTML += `<a href="${facebook}" target="_blank" rel="noopener noreferrer" class="social-button facebook" aria-label="Facebook"><img src="/static/images/facebook.svg" alt="Facebook" /></a> `;
                //     if (instagram) socialMediaLinks.innerHTML += `<a href="${instagram}" target="_blank" rel="noopener noreferrer" class="social-button instagram" aria-label="Instagram"><img src="/static/images/instagram.svg" alt="Instagram" /></a> `;
                //     if (twitter) socialMediaLinks.innerHTML += `<a href="${twitter}" target="_blank" rel="noopener noreferrer" class="social-button twitter" aria-label="Twitter"><img src="/static/images/twitter.svg" alt="Twitter" /></a>`;
                // }
            }
             // Function to check if element is partially in viewport
             function isInViewport(element) {
                const rect = element.getBoundingClientRect();
                return (
                    rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.bottom >= 0
                );
            }

            // Skills section
            const skills = data.querySelector('skills');
            if (skills) {
                const technicalSkillsDiv = document.getElementById('technical-skills');
                technicalSkillsDiv.innerHTML = '<h3>Technical Skills</h3><ul></ul>';
                const techUl = technicalSkillsDiv.querySelector('ul');
                skills.querySelectorAll('technical > skill').forEach(skill => {
                    const li = document.createElement('li');
                    li.textContent = skill.textContent;
                    techUl.appendChild(li);
                });

                const talentsDiv = document.getElementById('talents');
                talentsDiv.innerHTML = '<h3>Talents</h3><ul></ul><div id="talent-media-container" style="position: relative; margin-top: 10px;"></div>';
                const talentsUl = talentsDiv.querySelector('ul');
                const mediaContainer = talentsDiv.querySelector('#talent-media-container');
                skills.querySelectorAll('talents > talent').forEach(talent => {
                    const name = talent.querySelector('name')?.textContent || '';
                    const media = talent.querySelector('media');

                    const li = document.createElement('li');
                    li.textContent = name;
                    li.style.position = 'relative';
                    li.style.cursor = 'pointer';

                    let mediaElement = null;
                    if (media) {
                        const mediaType = media.getAttribute('type') || '';
                        const mediaSrc = media.textContent || '';

                        if(name.toLowerCase() === 'choreographer') {
                            console.log('Choreographer media:', mediaType, mediaSrc);
                        }

                        if (mediaType === 'image') {
                            mediaElement = document.createElement('img');
                            mediaElement.src = mediaSrc;
                            mediaElement.style.maxWidth = '900px';
                            mediaElement.style.maxHeight = '600px';
                            mediaElement.style.borderRadius = '8px';
                            mediaElement.style.objectFit = 'cover';
                            mediaElement.style.position = 'absolute';
                            mediaElement.style.top = '100%';
                            mediaElement.style.left = '50%';
                            mediaElement.style.transform = 'translateX(-50%)';
                            mediaElement.style.border = '1px solid #004a75';
                            mediaElement.style.boxShadow = '0 0 8px #002233';
                            mediaElement.style.zIndex = '10';
                            mediaElement.style.display = 'none';
                        } else if (mediaType === 'video') {
                            mediaElement = document.createElement('video');
                            mediaElement.src = mediaSrc;
                            mediaElement.controls = true;
                            mediaElement.style.maxWidth = '900px';
                            mediaElement.style.maxHeight = '600px';
                            mediaElement.style.borderRadius = '8px';
                            mediaElement.style.objectFit = 'cover';
                            mediaElement.style.position = 'absolute';
                            mediaElement.style.top = '100%';
                            mediaElement.style.left = '50%';
                            mediaElement.style.transform = 'translateX(-50%)';
                            mediaElement.style.border = '1px solid #004a75';
                            mediaElement.style.boxShadow = '0 0 8px #002233';
                            mediaElement.style.zIndex = '10';
                            mediaElement.style.display = 'none';
                        }
                    }

                    if (mediaElement) {
                        li.appendChild(mediaElement);

                        li.addEventListener('mouseenter', () => {
                            mediaElement.style.display = 'block';
                        });
                        li.addEventListener('mouseleave', () => {
                            mediaElement.style.display = 'none';
                            if (mediaElement.tagName.toLowerCase() === 'video') {
                                mediaElement.pause();
                                mediaElement.currentTime = 0;
                            }
                        });
                    }

                    talentsUl.appendChild(li);
                });
            }

            // Organizations section
            const organizations = data.querySelector('organizations');
            if (organizations) {
                const orgList = document.getElementById('organizations-list');
                orgList.innerHTML = '';
organizations.querySelectorAll('organization').forEach(org => {
    const container = document.createElement('span');
    container.style.marginRight = '20px';
    container.style.display = 'inline-flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';

    const orgName = org.querySelector('name')?.textContent || '';
    const orgRole = org.querySelector('role')?.textContent || '';
    const orgYears = org.querySelector('years')?.textContent || '';

    const textSpan = document.createElement('span');
    textSpan.innerHTML = `<strong>${orgName}</strong> - ${orgRole} (${orgYears})`;

    const img = document.createElement('img');
    img.style.marginTop = '10px';
    img.style.maxWidth = '350px';
    img.style.height = 'auto';

    // Map organization names to image filenames and max widths
    const imageMap = {
        'TXT FANBASE': { src: '/static/images/TCD.png', maxWidth: '400px' },
        'Dance Club': { src: '/static/images/TXT.png', maxWidth: '400px' }
    };

    const imageInfo = imageMap[orgName] || { src: '', maxWidth: '400px' };
    img.src = imageInfo.src;
    img.style.maxWidth = imageInfo.maxWidth;

    container.appendChild(textSpan);
    container.appendChild(img);

    const button = document.createElement('button');
    button.textContent = 'VISIT';
    button.style.marginTop = '10px';
    button.style.padding = '6px 12px';
    button.style.border = 'none';
    button.style.borderRadius = '6px';
    button.style.backgroundColor = '#00aaff';
    button.style.color = 'white';
    button.style.fontWeight = 'bold';
    button.style.cursor = 'pointer';

    // Optionally, add click event to button (e.g., open a link)
    button.addEventListener('click', () => {
        // Map organization names to URLs
        const urlMap = {
            'TXT FANBASE': 'https://twitter.com/TXTChartData',
            'Dance Club': 'https://www.youtube.com/@TXT_bighit'
        };
        const url = urlMap[orgName];
        if (url) {
            window.open(url, '_blank');
        }
    });

    container.appendChild(button);

    orgList.appendChild(container);
});
            }

            // Services section
            const services = data.querySelector('services');
            if (services) {
                const servicesList = document.getElementById('services-list');
                servicesList.innerHTML = '';
                services.querySelectorAll('service').forEach(service => {
                    const div = document.createElement('div');
                    div.innerHTML = `<h4>${service.querySelector('name')?.textContent || ''}</h4><p>${service.querySelector('description')?.textContent || ''}</p>`;
                    const testimonials = service.querySelector('testimonials');
                    if (testimonials) {
                        const ul = document.createElement('ul');
                        testimonials.querySelectorAll('testimonial').forEach(testimonial => {
                            const li = document.createElement('li');
                            li.textContent = testimonial.textContent;
                            ul.appendChild(li);
                        });
                        div.appendChild(ul);
                    }
                    servicesList.appendChild(div);
                });
            }

            // Projects section
            const projects = data.querySelector('projects');
            if (projects) {
                const projectsList = document.getElementById('projects-list');
                projectsList.innerHTML = '';
                projects.querySelectorAll('project').forEach(project => {
                    const div = document.createElement('div');
                    div.classList.add('project');
                    div.innerHTML = `
                        <h4>${project.querySelector('title')?.textContent || ''}</h4>
                        <p>${project.querySelector('description')?.textContent || ''}</p>
                        <p><strong>Technologies:</strong> ${Array.from(project.querySelectorAll('technology')).map(t => t.textContent).join(', ')}</p>
                        <a href="${project.querySelector('link')?.textContent || '#'}" target="_blank" class="project-link-button">Project Link</a>
                        <br/>
                        <img src="/static/images/system.png" alt="${project.querySelector('title')?.textContent || ''}" class="project-image" />
                    `;
                    projectsList.appendChild(div);
                });
            }

            // Testimonials section
            const testimonials = data.querySelector('testimonials');
            if (testimonials) {
                const testimonialsList = document.getElementById('testimonials-list');
                testimonialsList.innerHTML = '';
                testimonials.querySelectorAll('testimonial').forEach(testimonial => {
                    const div = document.createElement('div');
                    div.classList.add('testimonial');
                    // div.classList.add('testimonial-animated');
                    div.innerHTML = `
                        <p>"${testimonial.querySelector('message')?.textContent || ''}"</p>
                        <p><strong>${testimonial.querySelector('name')?.textContent || ''}</strong>, ${testimonial.querySelector('relationship')?.textContent || ''}</p>
                    `;
                    testimonialsList.appendChild(div);
                });
            }
           
            // Scroll event listener to trigger animation when testimonials section is in viewport
            const testimonialsSection = document.getElementById('testimonials-list');
            let animationTriggered = false;

            function checkAndAnimateTestimonials() {
                if (!animationTriggered && isInViewport(testimonialsSection)) {
                    const testimonialDivs = testimonialsSection.querySelectorAll('.testimonial');
                    testimonialDivs.forEach(div => {
                        div.classList.add('testimonial-animated');
                    });
                    animationTriggered = true;
                }
            }
            window.addEventListener('scroll', checkAndAnimateTestimonials);
            // Also check on load in case testimonials are already in view
            checkAndAnimateTestimonials();
        })
        .catch(err => {
            console.error('Error loading XML data:', err);
        });
});

// Burger menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.getElementById('burger-menu');
    const navMenu = document.getElementById('nav-menu');

    burgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
});
