document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ads-form');
    const generateBtn = document.getElementById('generate-btn');
    const btnText = generateBtn.querySelector('.btn-text');
    const loader = generateBtn.querySelector('.loader');
    
    const resultsPanel = document.getElementById('results-panel');
    const headlinesList = document.getElementById('headlines-list');
    const descriptionsList = document.getElementById('descriptions-list');
    const calloutsList = document.getElementById('callouts-list');
    const sitelinksList = document.getElementById('sitelinks-list');

    // Utility mapping for length checks
    const LIMITS = {
        headline: 30,
        description: 90,
        callout: 25,
        sitelinkTitle: 25,
        sitelinkDesc: 35
    };

    // Helper to truncate safely without cutting words in half if possible
    function truncate(str, limit) {
        if (str.length <= limit) return str;
        return str.substring(0, limit - 3).trim() + "...";
    }

    // Template generator (acts as placeholder for actual LLM/AI logic)
    function generateAdCopy(businessType, location) {
        // Mock some slight artificial delay for effect
        return new Promise((resolve) => {
            setTimeout(() => {
                const bType = businessType.trim();
                const loc = location.trim();

                resolve({
                    headlines: [
                        truncate(`Best ${bType} in ${loc}`, LIMITS.headline),
                        truncate(`Expert ${bType} Services`, LIMITS.headline),
                        truncate(`${loc}'s Top ${bType}`, LIMITS.headline),
                        truncate(`Fast, Reliable & Local`, LIMITS.headline),
                        truncate(`Get A Free Estimate Today`, LIMITS.headline),
                        truncate(`24/7 ${bType} Available`, LIMITS.headline),
                        truncate(`Trusted ${bType} Experts`, LIMITS.headline),
                        truncate(`Call Us Now For Quick Help`, LIMITS.headline),
                        truncate(`Affordable ${bType} in ${loc}`, LIMITS.headline),
                        truncate(`Need a ${bType}? Call Now`, LIMITS.headline),
                        truncate(`Top Rated in ${loc}`, LIMITS.headline),
                        truncate(`Professional ${bType}`, LIMITS.headline),
                        truncate(`100% Satisfaction Guarantee`, LIMITS.headline),
                        truncate(`Locally Owned & Operated`, LIMITS.headline),
                        truncate(`Book Your Appointment Today`, LIMITS.headline)
                    ],
                    descriptions: [
                        truncate(`Looking for a reliable ${bType} in ${loc}? We offer fast, professional, and affordable services.`, LIMITS.description),
                        truncate(`Don't wait! Our expert ${bType} team in ${loc} is ready to help you with your needs today.`, LIMITS.description),
                        truncate(`Top-rated ${bType} services in ${loc}. We guarantee 100% satisfaction on every single job.`, LIMITS.description),
                        truncate(`Get the best ${bType} near you! Quality workmanship, upfront pricing, and local experts.`, LIMITS.description)
                    ],
                    callouts: [
                        truncate(`Free Estimates`, LIMITS.callout),
                        truncate(`Available 24/7`, LIMITS.callout),
                        truncate(`Locally Owned`, LIMITS.callout),
                        truncate(`Licensed & Insured`, LIMITS.callout),
                        truncate(`Satisfaction Guaranteed`, LIMITS.callout),
                        truncate(`Fast Response Time`, LIMITS.callout),
                        truncate(`Affordable Rates`, LIMITS.callout),
                        truncate(`Expert Technicians`, LIMITS.callout)
                    ],
                    sitelinks: [
                        {
                            title: truncate(`Our Services`, LIMITS.sitelinkTitle),
                            desc1: truncate(`See everything we offer`, LIMITS.sitelinkDesc),
                            desc2: truncate(`Comprehensive ${bType} solutions`, LIMITS.sitelinkDesc)
                        },
                        {
                            title: truncate(`Contact Us Today`, LIMITS.sitelinkTitle),
                            desc1: truncate(`Get in touch right away`, LIMITS.sitelinkDesc),
                            desc2: truncate(`We're ready to help you`, LIMITS.sitelinkDesc)
                        },
                        {
                            title: truncate(`Read Our Reviews`, LIMITS.sitelinkTitle),
                            desc1: truncate(`See what clients say`, LIMITS.sitelinkDesc),
                            desc2: truncate(`5-Star rated in ${loc}`, LIMITS.sitelinkDesc)
                        },
                        {
                            title: truncate(`Get A Free Quote`, LIMITS.sitelinkTitle),
                            desc1: truncate(`No hidden fees or costs`, LIMITS.sitelinkDesc),
                            desc2: truncate(`Upfront transparent pricing`, LIMITS.sitelinkDesc)
                        }
                    ]
                });
            }, 1500); // 1.5s delay
        });
    }

    function renderList(listElement, items, isSitelink = false) {
        listElement.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            if (isSitelink) {
                li.className = 'sitelink-item';
                li.innerHTML = `
                    <strong>${item.title} <span class="char-count">${item.title.length}/25</span></strong>
                    <span>${item.desc1} <span class="char-count">${item.desc1.length}/35</span></span>
                    <span>${item.desc2} <span class="char-count">${item.desc2.length}/35</span></span>
                `;
            } else {
                li.textContent = item;
                // Click to copy functionality
                li.title = "Click to copy";
                li.addEventListener('click', () => {
                    navigator.clipboard.writeText(item);
                    const originalText = li.textContent;
                    li.textContent = "Copied!";
                    li.style.borderColor = "var(--accent)";
                    li.style.color = "var(--accent)";
                    setTimeout(() => {
                        li.textContent = originalText;
                        li.style.borderColor = "transparent";
                        li.style.color = "var(--text-main)";
                    }, 1000);
                });
            }
            listElement.appendChild(li);
        });
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const bType = document.getElementById('business-type').value;
        const loc = document.getElementById('location').value;

        if (!bType || !loc) return;

        // UI Loading state
        btnText.classList.add('hidden');
        loader.classList.remove('hidden');
        generateBtn.disabled = true;
        
        // Hide panel during generation if already open
        resultsPanel.classList.add('hidden');

        try {
            const data = await generateAdCopy(bType, loc);
            
            // Render results
            renderList(headlinesList, data.headlines);
            renderList(descriptionsList, data.descriptions);
            renderList(calloutsList, data.callouts);
            renderList(sitelinksList, data.sitelinks, true);

            // Show panel
            resultsPanel.classList.remove('hidden');
            
            // Re-trigger animations by cloning elements (simple trick)
            const cards = document.querySelectorAll('.result-card');
            cards.forEach(card => {
                card.style.animation = 'none';
                card.offsetHeight; /* trigger reflow */
                card.style.animation = null; 
            });

        } catch (err) {
            console.error(err);
            alert("Error generating copy.");
        } finally {
            // Restore UI state
            btnText.classList.remove('hidden');
            loader.classList.add('hidden');
            generateBtn.disabled = false;
        }
    });

});
