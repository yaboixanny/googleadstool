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
    
    const logo = document.getElementById('logo');
    
    // Reset page functionality
    logo.addEventListener('click', () => {
        form.reset();
        resultsPanel.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Utility mapping for character limits
    const LIMITS = {
        headline: 30,
        description: 90,
        callout: 25,
        sitelinkTitle: 25,
        sitelinkDesc: 35
    };

    // Advanced Generator Engine
    function generateDynamicCopy(bType, loc, keyword, offer, usp) {
        // Clean inputs
        bType = bType.trim();
        loc = loc.trim();
        keyword = keyword.trim() || bType; // Fallback to bType if no keyword provided
        offer = offer.trim();
        usp = usp.trim();

        // Synonym Sets
        const prefixes = ["Best", "Top", "Expert", "#1", "Local", "Pro", "Reliable", "Trusted"];
        const actions = ["Call", "Get", "Book", "Find", "Hire", "Need"];
        const urgency = ["Now", "Today", "ASAP", "Fast"];
        const qualities = ["Affordable", "Fast & Reliable", "Professional", "Guaranteed", "Certified"];
        
        // Helper to validate and shuffle arrays
        const shuffle = (array) => [...array].sort(() => 0.5 - Math.random());
        
        // Helper to evaluate a template. If it fits, return string. If not, return null.
        const validate = (str, limit) => {
            const clean = str.replace(/\s+/g, ' ').trim();
            return clean.length > 0 && clean.length <= limit ? clean : null;
        };

        // Headlines Collection (Max 30 chars)
        const possibleHeadlines = [];
        
        // Strategy 1: Location + Business Type
        prefixes.forEach(p => possibleHeadlines.push(`${p} ${keyword} in ${loc}`));
        prefixes.forEach(p => possibleHeadlines.push(`${loc}'s ${p} ${bType}`));
        
        // Strategy 2: Actions & Urgency
        actions.forEach(a => possibleHeadlines.push(`${a} A ${bType} ${urgency[0]}`));
        possibleHeadlines.push(`Need a ${bType}? Call Now`);
        possibleHeadlines.push(`Find a ${bType} in ${loc}`);
        
        // Strategy 3: Offer & USP (if provided)
        if (offer) {
            possibleHeadlines.push(`${offer} On ${bType}`);
            possibleHeadlines.push(`Get ${offer} Today`);
            possibleHeadlines.push(`Claim ${offer} Now`);
        }
        if (usp) {
            possibleHeadlines.push(`${usp} - ${bType}`);
            possibleHeadlines.push(usp);
        }
        
        // Strategy 4: High Converting Generic
        qualities.forEach(q => possibleHeadlines.push(`${q} ${bType}`));
        possibleHeadlines.push(`100% Satisfaction Guarantee`);
        possibleHeadlines.push(`Locally Owned & Operated`);
        possibleHeadlines.push(`Highly Rated in ${loc}`);
        
        // Filter valid headlines and keep unique
        const validHeadlines = [...new Set(possibleHeadlines.map(h => validate(h, LIMITS.headline)).filter(Boolean))];
        const finalHeadlines = shuffle(validHeadlines).slice(0, 15);

        // Descriptions Collection (Max 90 chars)
        const possibleDescriptions = [];
        
        // Much shorter base options to accommodate long bType/loc injected strings
        possibleDescriptions.push(`Need a ${bType} in ${loc}? Call our experts today.`);
        possibleDescriptions.push(`Top ${keyword} in ${loc}. 100% Satisfaction Guaranteed. Get a quote!`);
        possibleDescriptions.push(`Expert ${bType} services in ${loc}. Fast response & low prices.`);
        possibleDescriptions.push(`Local ${keyword} experts serving ${loc}. Free estimates!`);
        
        if (offer) {
            possibleDescriptions.push(`Get ${offer} on ${bType} in ${loc}. Book today!`);
            possibleDescriptions.push(`Call now for ${offer}! Most trusted ${keyword} in town.`);
        }
        if (usp) {
            possibleDescriptions.push(`${usp}. Your #1 choice for ${bType} in ${loc}.`);
            possibleDescriptions.push(`Expert ${keyword}. ${usp}.`);
        }

        // Absolute Fallbacks without location to save length
        possibleDescriptions.push(`Top rated ${bType} professionals. Call today for a free estimate!`);
        possibleDescriptions.push(`Expert ${keyword} services. Fast, affordable, and local. Book now!`);
        
        // Ultra-short static fallbacks that will NEVER breach 90 characters
        possibleDescriptions.push(`Quality services for your needs. 100% satisfaction guaranteed.`);
        possibleDescriptions.push(`Professional, affordable & reliable experts ready to assist you.`);

        let validDescriptions = [...new Set(possibleDescriptions.map(d => validate(d, LIMITS.description)).filter(Boolean))];
        
        // If we somehow still don't have enough, force the ultra-short static ones
        if (validDescriptions.length < 4) {
            validDescriptions.push(`Quality services for your needs. 100% satisfaction guaranteed.`);
            validDescriptions.push(`Professional, affordable & reliable experts ready to assist you.`);
            validDescriptions.push(`Contact us today for top-tier service at an unbeatable price.`);
            validDescriptions.push(`Your local pros. Get the job done right the first time.`);
            validDescriptions = [...new Set(validDescriptions)]; // Deduplicate again
        }
        
        const finalDescriptions = shuffle(validDescriptions).slice(0, 4);

        // Callout Extensions Collection (Max 25 chars)
        const possibleCallouts = [
            "Free Estimates", "Available 24/7", "Locally Owned", "Licensed & Insured",
            "Satisfaction Guaranteed", "Fast Response Time", "Affordable Rates", 
            "Expert Technicians", "No Hidden Fees", "5-Star Ratings"
        ];
        if (offer) possibleCallouts.push(offer);
        if (usp) possibleCallouts.push(usp);

        const validCallouts = [...new Set(possibleCallouts.map(c => validate(c, LIMITS.callout)).filter(Boolean))];
        const finalCallouts = shuffle(validCallouts).slice(0, 8);

        // Sitelink Extensions Collection (Title: 25, Desc1/2: 35)
        const generateSafeSitelink = (title, d1, d2) => {
            const safeTitle = validate(title, LIMITS.sitelinkTitle);
            const safeD1 = validate(d1, LIMITS.sitelinkDesc);
            const safeD2 = validate(d2, LIMITS.sitelinkDesc);
            if(safeTitle && safeD1 && safeD2) return { title: safeTitle, desc1: safeD1, desc2: safeD2 };
            return null;
        };

        const possibleSitelinks = [
            generateSafeSitelink("Our Services", "See everything we offer", `Top-tier ${keyword} help`),
            generateSafeSitelink("Contact Us Today", "Get in touch right away", "We are ready to help you"),
            generateSafeSitelink("Read Our Reviews", "See what our clients say", `5-Star rated local experts`),
            generateSafeSitelink("Get A Free Quote", "No hidden fees or costs", "Upfront transparent pricing")
        ];

        if (offer) {
            possibleSitelinks.push(generateSafeSitelink("Special Offers", `Claim your deals today`, "Limited time discounts"));
        }
        if (usp) {
            possibleSitelinks.push(generateSafeSitelink("Why Choose Us?", `${usp}`, "Experience the best service"));
        }
        
        // Static fallbacks that will ALWAYS pass the extremely strict 25 and 35 limits
        possibleSitelinks.push({title: "View Our Services", desc1: "Quality work guaranteed", desc2: "See how we can help you"});
        possibleSitelinks.push({title: "Contact Us Now", desc1: "Message or call us", desc2: "Fast & friendly response"});
        possibleSitelinks.push({title: "Read Client Reviews", desc1: "Trusted by many", desc2: "5-star average rating"});
        possibleSitelinks.push({title: "Free Estimates", desc1: "No obligation quotes", desc2: "100% transparent pricing"});

        let validSitelinks = possibleSitelinks.filter(Boolean);
        // Deduplicate Sitelinks by Title
        const uniqueSitelinkMap = new Map();
        validSitelinks.forEach(sl => {
            if(!uniqueSitelinkMap.has(sl.title) && sl.title.length <= LIMITS.sitelinkTitle && sl.desc1.length <= LIMITS.sitelinkDesc && sl.desc2.length <= LIMITS.sitelinkDesc) {
                uniqueSitelinkMap.set(sl.title, sl);
            }
        });
        const finalSitelinks = shuffle(Array.from(uniqueSitelinkMap.values())).slice(0, 4);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    headlines: finalHeadlines,
                    descriptions: finalDescriptions,
                    callouts: finalCallouts,
                    sitelinks: finalSitelinks
                });
            }, 800); // 800ms virtual delay for aesthetic loading effect
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
        const keyword = document.getElementById('keyword').value;
        const offer = document.getElementById('offer').value;
        const usp = document.getElementById('usp').value;

        if (!bType || !loc) return;

        // UI Loading state
        btnText.classList.add('hidden');
        loader.classList.remove('hidden');
        generateBtn.disabled = true;
        
        // Hide panel during generation if already open
        resultsPanel.classList.add('hidden');

        try {
            const data = await generateDynamicCopy(bType, loc, keyword, offer, usp);
            
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
