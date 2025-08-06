document.addEventListener('DOMContentLoaded', () => {
    // Enhanced sound effects with fallbacks
    const sounds = {
        pour: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-pouring-water-on-the-ground-2216.mp3'),
        reaction: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-science-fiction-alarm-901.mp3'),
        fizz: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-bubbles-in-water-1173.mp3'),
        success: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3'),
        error: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3'),
        explosion: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-explosion-1685.mp3'),
        heating: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-fire-crackling-1330.mp3')
    };

    // Sound control with enhanced feedback
    const soundControl = document.getElementById('soundControl');
    let soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
    
    updateSoundControl();

    soundControl.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        localStorage.setItem('soundEnabled', soundEnabled);
        updateSoundControl();
        
        // Provide feedback
        if (soundEnabled) {
            playSound(sounds.success);
        }
    });

    function updateSoundControl() {
        soundControl.innerHTML = soundEnabled ? 
            '<i class="fas fa-volume-up"></i>' : 
            '<i class="fas fa-volume-mute"></i>';
        soundControl.style.opacity = soundEnabled ? '1' : '0.6';
    }

    // Enhanced sound system with error handling
    function playSound(sound) {
        if (soundEnabled && sound) {
            try {
                sound.currentTime = 0;
                sound.volume = 0.4;
                const playPromise = sound.play();
                if (playPromise !== undefined) {
                    playPromise.catch(e => {
                        console.log('Sound play failed:', e);
                        showStatusMessage('Sound disabled by browser policy', 'warning');
                    });
                }
            } catch (e) {
                console.log('Sound error:', e);
            }
        }
    }

    // Initialize all sounds
    Object.values(sounds).forEach(sound => {
        sound.volume = 0.4;
        sound.preload = 'auto';
    });

    // Enhanced bubble system with physics
    const bubblesContainer = document.getElementById('bubbles');
    const bubbleCount = window.innerWidth < 768 ? 15 : 25;
    
    for (let i = 0; i < bubbleCount; i++) {
        createBubble();
    }

    function createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.left = Math.random() * 100 + '%';
        const size = 5 + Math.random() * 15;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.animationDuration = (8 + Math.random() * 8) + 's';
        bubble.style.animationDelay = Math.random() * 5 + 's';
        
        // Add subtle color variations
        const colors = [
            'rgba(255, 255, 255, 0.6)',
            'rgba(37, 99, 235, 0.3)',
            'rgba(5, 150, 105, 0.3)',
            'rgba(239, 68, 68, 0.3)'
        ];
        bubble.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        bubblesContainer.appendChild(bubble);

        // Remove and recreate bubble after animation
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.remove();
                createBubble();
            }
        }, (8 + Math.random() * 8) * 1000);
    }

    // Element references
    const element1Select = document.getElementById('element1');
    const quantity1Input = document.getElementById('quantity1');
    const element2Select = document.getElementById('element2');
    const quantity2Input = document.getElementById('quantity2');
    const element3Select = document.getElementById('element3');
    const quantity3Input = document.getElementById('quantity3');
    const mixButton = document.getElementById('mixButton');

    // Beaker references
    const reactantBeaker1 = document.getElementById('reactant-beaker-1');
    const reactantContent1 = document.getElementById('reactant-content-1');
    const reactantLabel1 = document.getElementById('reactant-label-1');
    const reactantBeaker2 = document.getElementById('reactant-beaker-2');
    const reactantContent2 = document.getElementById('reactant-content-2');
    const reactantLabel2 = document.getElementById('reactant-label-2');
    const reactantBeaker3 = document.getElementById('reactant-beaker-3');
    const reactantContent3 = document.getElementById('reactant-content-3');
    const reactantLabel3 = document.getElementById('reactant-label-3');
    const reactionFlask = document.getElementById('reaction-flask');
    const reactionContent = document.getElementById('reaction-content');
    const productBeaker = document.getElementById('product-beaker');
    const productContent = document.getElementById('product-content');
    const productLabel = document.getElementById('product-label');
    const resultDiv = document.getElementById('result');
    const reactionDiagramDiv = document.getElementById('reactionDiagram');
    const productImageDiv = document.getElementById('product-image');

    // Enhanced element properties with more detailed information
    const elementProperties = {
        'H': { color: '#3b82f6', icon: '🔵', name: 'Hydrogen', atomicNumber: 1, state: 'gas' },
        'O': { color: '#ef4444', icon: '🔴', name: 'Oxygen', atomicNumber: 8, state: 'gas' },
        'C': { color: '#6b7280', icon: '⚫', name: 'Carbon', atomicNumber: 6, state: 'solid' },
        'Na': { color: '#f59e0b', icon: '🟡', name: 'Sodium', atomicNumber: 11, state: 'solid' },
        'Cl': { color: '#22c55e', icon: '🟢', name: 'Chlorine', atomicNumber: 17, state: 'gas' },
        'N': { color: '#8b5cf6', icon: '🟣', name: 'Nitrogen', atomicNumber: 7, state: 'gas' }
    };

    // Enhanced product properties with safety information
    const productProperties = {
        'water': {
            color: '#0ea5e9',
            icon: '💧',
            name: 'Water (H₂O)',
            sound: 'reaction',
            safety: 'Safe',
            ph: 7,
            temperature: 'Room temperature',
            description: 'Essential for life, neutral pH'
        },
        'salt': {
            color: '#e5e7eb',
            icon: '🧂',
            name: 'Sodium Chloride (NaCl)',
            sound: 'success',
            safety: 'Safe',
            ph: 7,
            temperature: 'Room temperature',
            description: 'Common table salt, ionic compound'
        },
        'carbon-dioxide': {
            color: '#9ca3af',
            icon: '☁️',
            name: 'Carbon Dioxide (CO₂)',
            sound: 'fizz',
            safety: 'Caution',
            ph: 5.6,
            temperature: 'Room temperature',
            description: 'Greenhouse gas, slightly acidic in water'
        },
        'ammonia': {
            color: '#06b6d4',
            icon: '🧴',
            name: 'Ammonia (NH₃)',
            sound: 'reaction',
            safety: 'Caution',
            ph: 11,
            temperature: 'Room temperature',
            description: 'Strong base, pungent odor'
        },
        'methane': {
            color: '#84cc16',
            icon: '🔥',
            name: 'Methane (CH₄)',
            sound: 'fizz',
            safety: 'Flammable',
            ph: 7,
            temperature: 'Room temperature',
            description: 'Natural gas, highly flammable'
        },
        'vinegar': {
            color: '#f3f4f6',
            icon: '🍶',
            name: 'Acetic Acid (CH₃COOH)',
            sound: 'reaction',
            safety: 'Mild acid',
            ph: 2.5,
            temperature: 'Room temperature',
            description: 'Common household acid'
        },
        'baking-soda': {
            color: '#fbbf24',
            icon: '🧂',
            name: 'Sodium Bicarbonate (NaHCO₃)',
            sound: 'success',
            safety: 'Safe',
            ph: 9,
            temperature: 'Room temperature',
            description: 'Common household base'
        },
        'ethanol': {
            color: '#a78bfa',
            icon: '🍷',
            name: 'Ethanol (C₂H₅OH)',
            sound: 'reaction',
            safety: 'Flammable',
            ph: 7,
            temperature: 'Room temperature',
            description: 'Drinking alcohol, flammable liquid'
        },
        'hydrogen-peroxide': {
            color: '#bfdbfe',
            icon: '🧪',
            name: 'Hydrogen Peroxide (H₂O₂)',
            sound: 'fizz',
            safety: 'Oxidizer',
            ph: 6.2,
            temperature: 'Room temperature',
            description: 'Powerful oxidizing agent'
        },
        'sodium-hydroxide': {
            color: '#fef3c7',
            icon: '⚠️',
            name: 'Sodium Hydroxide (NaOH)',
            sound: 'reaction',
            safety: 'Caustic',
            ph: 14,
            temperature: 'Hot',
            description: 'Very strong base, caustic'
        }
    };

    // Status message system
    function showStatusMessage(message, type = 'info', duration = 3000) {
        const statusDiv = document.createElement('div');
        statusDiv.className = `status-indicator ${type}`;
        statusDiv.textContent = message;
        document.body.appendChild(statusDiv);
        
        setTimeout(() => statusDiv.classList.add('show'), 100);
        
        setTimeout(() => {
            statusDiv.classList.remove('show');
            setTimeout(() => statusDiv.remove(), 300);
        }, duration);
    }

    // Enhanced beaker content update with animations
    function updateBeakerContent(contentElement, labelElement, element, quantity, animate = false) {
        if (element && quantity > 0) {
            const elemProps = elementProperties[element];
            if (elemProps) {
                if (animate) {
                    contentElement.style.transition = 'all 0.8s ease';
                }
                
                contentElement.style.backgroundColor = elemProps.color;
                contentElement.className = `content ${element.toLowerCase()}`;
                labelElement.innerHTML = `${elemProps.icon} ${elemProps.name}<br><small>(${quantity})</small>`;
                contentElement.style.height = `${Math.min(85, 15 + quantity * 8)}%`;
                
                // Add subtle glow effect for reactive elements
                if (['Na', 'Cl', 'O'].includes(element)) {
                    contentElement.style.boxShadow = `inset 0 0 20px ${elemProps.color}40`;
                }
            }
        } else {
            contentElement.style.backgroundColor = 'transparent';
            contentElement.style.boxShadow = 'none';
            labelElement.innerHTML = '';
            contentElement.style.height = '0%';
            contentElement.className = 'content';
        }
    }

    // Initialize beakers with enhanced visuals
    updateBeakerContent(reactantContent1, reactantLabel1, element1Select.value, parseInt(quantity1Input.value) || 0);
    updateBeakerContent(reactantContent2, reactantLabel2, element2Select.value, parseInt(quantity2Input.value) || 0);
    updateBeakerContent(reactantContent3, reactantLabel3, element3Select.value, parseInt(quantity3Input.value) || 0);

    // Enhanced event listeners with debouncing
    let updateTimeout;
    function debounceUpdate(callback, delay = 300) {
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(callback, delay);
    }

    element1Select.addEventListener('change', () => {
        updateBeakerContent(reactantContent1, reactantLabel1, element1Select.value, parseInt(quantity1Input.value) || 0, true);
    });

    quantity1Input.addEventListener('input', () => {
        debounceUpdate(() => {
            updateBeakerContent(reactantContent1, reactantLabel1, element1Select.value, parseInt(quantity1Input.value) || 0, true);
        });
    });

    element2Select.addEventListener('change', () => {
        updateBeakerContent(reactantContent2, reactantLabel2, element2Select.value, parseInt(quantity2Input.value) || 0, true);
    });

    quantity2Input.addEventListener('input', () => {
        debounceUpdate(() => {
            updateBeakerContent(reactantContent2, reactantLabel2, element2Select.value, parseInt(quantity2Input.value) || 0, true);
        });
    });

    element3Select.addEventListener('change', () => {
        updateBeakerContent(reactantContent3, reactantLabel3, element3Select.value, parseInt(quantity3Input.value) || 0, true);
    });

    quantity3Input.addEventListener('input', () => {
        debounceUpdate(() => {
            updateBeakerContent(reactantContent3, reactantLabel3, element3Select.value, parseInt(quantity3Input.value) || 0, true);
        });
    });

    // Enhanced mix button with loading state
    let isReacting = false;
    mixButton.addEventListener('click', async () => {
        if (isReacting) return;
        
        const element1 = element1Select.value;
        const quantity1 = parseInt(quantity1Input.value) || 0;
        const element2 = element2Select.value;
        const quantity2 = parseInt(quantity2Input.value) || 0;
        const element3 = element3Select.value;
        const quantity3 = parseInt(quantity3Input.value) || 0;

        // Reset previous results
        resetReaction();

        // Validate inputs
        const hasElements = (element1 && quantity1 > 0) || (element2 && quantity2 > 0) || (element3 && quantity3 > 0);
        
        if (!hasElements) {
            showError("Please select at least one element with a quantity greater than 0.");
            return;
        }

        // Check for dangerous combinations
        if (isDangerousCombination(element1, quantity1, element2, quantity2, element3, quantity3)) {
            showError("⚠️ Dangerous combination detected! Reaction prevented for safety.", 'danger');
            return;
        }

        // Set loading state
        isReacting = true;
        mixButton.disabled = true;
        mixButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> REACTING...';
        
        // Determine the reaction
        const reaction = determineReaction(element1, quantity1, element2, quantity2, element3, quantity3);

        if (reaction) {
            await animateReaction(reaction);
        } else {
            showError("No valid reaction found for the selected elements and quantities.");
        }
        
        // Reset loading state
        isReacting = false;
        mixButton.disabled = false;
        mixButton.innerHTML = '<i class="fas fa-magic"></i> Mix Elements';
    });

    // Check for dangerous combinations
    function isDangerousCombination(e1, q1, e2, q2, e3, q3) {
        const elements = [];
        if (e1 && q1 > 0) elements.push({ symbol: e1, quantity: q1 });
        if (e2 && q2 > 0) elements.push({ symbol: e2, quantity: q2 });
        if (e3 && q3 > 0) elements.push({ symbol: e3, quantity: q3 });

        // Check for explosive combinations (simplified for demo)
        const hasNa = elements.find(e => e.symbol === 'Na' && e.quantity > 5);
        const hasO = elements.find(e => e.symbol === 'O' && e.quantity > 3);
        
        return hasNa && hasO; // Sodium + Oxygen in large quantities
    }

    // Enhanced reset function
    function resetReaction() {
        resultDiv.textContent = '';
        resultDiv.className = '';
        reactionDiagramDiv.innerHTML = '';
        productImageDiv.innerHTML = '';
        productContent.className = 'content';
        productContent.style.backgroundColor = 'transparent';
        productContent.style.height = '0%';
        productContent.style.boxShadow = 'none';
        productLabel.innerHTML = '';
        reactionContent.style.backgroundColor = 'transparent';
        reactionContent.classList.remove('animate-swirl', 'animate-fizz', 'animate-glow');
        productContent.classList.remove('animate-appear', 'animate-fizz');
        reactionFlask.classList.remove('animate-glow');
    }

    // Enhanced reaction determination with more combinations
    function determineReaction(e1, q1, e2, q2, e3, q3) {
        const elements = [];
        if (e1 && q1 > 0) elements.push({ symbol: e1, quantity: q1 });
        if (e2 && q2 > 0) elements.push({ symbol: e2, quantity: q2 });
        if (e3 && q3 > 0) elements.push({ symbol: e3, quantity: q3 });

        // Sort elements for consistent comparison
        const sortedElements = [...elements].sort((a, b) => a.symbol.localeCompare(b.symbol));

        // Helper to find an element by symbol
        const findElement = (symbol) => sortedElements.find(elem => elem.symbol === symbol);

        // Two-element reactions
        if (sortedElements.length === 2) {
            const elemH = findElement('H');
            const elemO = findElement('O');
            const elemC = findElement('C');
            const elemNa = findElement('Na');
            const elemCl = findElement('Cl');
            const elemN = findElement('N');

            // Water: 2H + O → H₂O
            if (elemH && elemO && elemH.quantity >= 2 && elemO.quantity >= 1) {
                return createReaction('water', '2H + O → H₂O', sortedElements, 
                    Math.min(Math.floor(elemH.quantity / 2), elemO.quantity));
            }
            // Salt: Na + Cl → NaCl
            else if (elemNa && elemCl && elemNa.quantity >= 1 && elemCl.quantity >= 1) {
                return createReaction('salt', 'Na + Cl → NaCl', sortedElements,
                    Math.min(elemNa.quantity, elemCl.quantity));
            }
            // Carbon Dioxide: C + 2O → CO₂
            else if (elemC && elemO && elemC.quantity >= 1 && elemO.quantity >= 2) {
                return createReaction('carbon-dioxide', 'C + 2O → CO₂', sortedElements,
                    Math.min(elemC.quantity, Math.floor(elemO.quantity / 2)));
            }
            // Ammonia: N + 3H → NH₃
            else if (elemN && elemH && elemN.quantity >= 1 && elemH.quantity >= 3) {
                return createReaction('ammonia', 'N + 3H → NH₃', sortedElements,
                    Math.min(elemN.quantity, Math.floor(elemH.quantity / 3)));
            }
            // Methane: C + 4H → CH₄
            else if (elemC && elemH && elemC.quantity >= 1 && elemH.quantity >= 4) {
                return createReaction('methane', 'C + 4H → CH₄', sortedElements,
                    Math.min(elemC.quantity, Math.floor(elemH.quantity / 4)));
            }
            // Hydrogen Peroxide: 2H + 2O → H₂O₂
            else if (elemH && elemO && elemH.quantity >= 2 && elemO.quantity >= 2) {
                return createReaction('hydrogen-peroxide', '2H + 2O → H₂O₂', sortedElements,
                    Math.min(Math.floor(elemH.quantity / 2), Math.floor(elemO.quantity / 2)));
            }
            // Sodium Hydroxide: Na + O + H → NaOH
            else if (elemNa && elemO && elemH && elemNa.quantity >= 1 && elemO.quantity >= 1 && elemH.quantity >= 1) {
                return createReaction('sodium-hydroxide', 'Na + O + H → NaOH', sortedElements,
                    Math.min(elemNa.quantity, elemO.quantity, elemH.quantity));
            }
        }
        // Three-element reactions
        else if (sortedElements.length === 3) {
            const elemC = findElement('C');
            const elemH = findElement('H');
            const elemO = findElement('O');
            const elemNa = findElement('Na');

            // Vinegar: 2C + 4H + 2O → CH₃COOH
            if (elemC && elemH && elemO && elemC.quantity >= 2 && elemH.quantity >= 4 && elemO.quantity >= 2) {
                return createReaction('vinegar', '2C + 4H + 2O → CH₃COOH', sortedElements,
                    Math.min(Math.floor(elemC.quantity / 2), Math.floor(elemH.quantity / 4), Math.floor(elemO.quantity / 2)));
            }
            // Baking Soda: Na + H + C + 3O → NaHCO₃
            else if (elemNa && elemH && elemC && elemO && 
                     elemNa.quantity >= 1 && elemH.quantity >= 1 && 
                     elemC.quantity >= 1 && elemO.quantity >= 3) {
                return createReaction('baking-soda', 'Na + H + C + 3O → NaHCO₃', sortedElements,
                    Math.min(elemNa.quantity, elemH.quantity, elemC.quantity, Math.floor(elemO.quantity / 3)));
            }
            // Ethanol: 2C + 6H + O → C₂H₅OH
            else if (elemC && elemH && elemO && elemC.quantity >= 2 && elemH.quantity >= 6 && elemO.quantity >= 1) {
                return createReaction('ethanol', '2C + 6H + O → C₂H₅OH', sortedElements,
                    Math.min(Math.floor(elemC.quantity / 2), Math.floor(elemH.quantity / 6), elemO.quantity));
            }
        }

        return null;
    }

    // Helper function to create reaction object
    function createReaction(type, equation, reactants, quantity) {
        return {
            type: type,
            equation: equation,
            reactants: reactants,
            product: {
                type: type,
                quantity: quantity
            }
        };
    }

    // Enhanced animation system
    async function animateReaction(reaction) {
        resetReaction();

        // Get active reactant beakers
        const activeReactants = [
            { beaker: reactantBeaker1, content: reactantContent1, element: element1Select.value, quantity: parseInt(quantity1Input.value) || 0 },
            { beaker: reactantBeaker2, content: reactantContent2, element: element2Select.value, quantity: parseInt(quantity2Input.value) || 0 },
            { beaker: reactantBeaker3, content: reactantContent3, element: element3Select.value, quantity: parseInt(quantity3Input.value) || 0 }
        ].filter(item => item.element && item.quantity > 0);

        showStatusMessage('Starting reaction...', 'info', 1500);
        
        // Play pour sound
        playSound(sounds.pour);

        // Animate pouring sequence
        for (let i = 0; i < activeReactants.length; i++) {
            const reactant = activeReactants[i];
            
            await new Promise(resolve => {
                setTimeout(() => {
                    // Animate the pouring motion
                    reactant.beaker.classList.add('animate-pour');
                    
                    // Transfer color to reaction flask with mixing effect
                    const elemProps = elementProperties[reactant.element];
                    if (elemProps) {
                        if (i === 0) {
                            reactionContent.style.backgroundColor = elemProps.color;
                        } else {
                            // Create mixing effect
                            const currentColor = reactionContent.style.backgroundColor;
                            reactionContent.style.background = `linear-gradient(45deg, ${currentColor}, ${elemProps.color})`;
                        }
                    }

                    // Reduce the reactant content with animation
                    const currentHeight = parseInt(reactant.content.style.height || '0');
                    reactant.content.style.height = `${Math.max(0, currentHeight - 25)}%`;
                    
                    resolve();
                }, i * 600);
            });
        }

        // Clear pour animations
        setTimeout(() => {
            activeReactants.forEach(reactant => {
                reactant.beaker.classList.remove('animate-pour');
            });
        }, activeReactants.length * 600 + 300);

        // Reaction phase
        await new Promise(resolve => {
            setTimeout(() => {
                showStatusMessage('Chemical reaction in progress...', 'info', 2000);
                
                // Play reaction sound
                const productSoundName = productProperties[reaction.type]?.sound;
                playSound(sounds[productSoundName]);

                // Enhanced reaction animation
                reactionContent.classList.add('animate-swirl');
                reactionFlask.classList.add('animate-glow');
                reactionContent.style.background = productProperties[reaction.type].color;

                // Display enhanced reaction info
                resultDiv.textContent = `✨ Successfully created: ${productProperties[reaction.type].name}`;
                resultDiv.className = 'success';
                
                const product = productProperties[reaction.type];
                reactionDiagramDiv.innerHTML = `
                    <div style="font-family: 'Courier New', monospace; font-size: 1.2rem; margin-bottom: 10px;">
                        ${reaction.equation}
                    </div>
                    <div style="font-size: 0.9rem; color: #6b7280;">
                        Safety: ${product.safety} | pH: ${product.ph} | ${product.description}
                    </div>
                `;
                
                productImageDiv.innerHTML = `<div style="font-size: 4rem; animation: bounce 1s infinite;">${product.icon}</div>`;

                resolve();
            }, activeReactants.length * 600 + 800);
        });

        // Product formation phase
        setTimeout(() => {
            reactionContent.classList.remove('animate-swirl');
            reactionFlask.classList.remove('animate-glow');
            reactionContent.style.background = 'transparent';

            showStatusMessage(`${productProperties[reaction.type].name} formed!`, 'success', 2000);

            // Show product in product beaker with enhanced animation
            productContent.classList.add(reaction.type, 'animate-appear');
            productContent.style.background = productProperties[reaction.type].color;
            productContent.style.height = `${Math.min(80, 20 + reaction.product.quantity * 6)}%`;
            productLabel.innerHTML = `${productProperties[reaction.type].icon}<br><strong>${productProperties[reaction.type].name.split(' ')[0]}</strong>`;

            // Special effects for certain products
            if (['carbon-dioxide', 'methane', 'hydrogen-peroxide'].includes(reaction.type)) {
                productContent.classList.add('animate-fizz');
                setTimeout(() => {
                    productContent.classList.remove('animate-fizz');
                }, 2000);
            }

        }, activeReactants.length * 600 + 2800);
    }

    // Enhanced error display
    function showError(message, type = 'error') {
        resultDiv.textContent = message;
        resultDiv.className = type;

        playSound(sounds.error);
        showStatusMessage(message, 'error');

        // Enhanced shake animation
        const beakers = [reactantBeaker1, reactantBeaker2, reactantBeaker3, reactionFlask, productBeaker];
        beakers.forEach((beaker, index) => {
            if (beaker) {
                setTimeout(() => {
                    beaker.style.animation = 'shake 0.6s ease-in-out';
                }, index * 100);
            }
        });

        setTimeout(() => {
            beakers.forEach(beaker => {
                if (beaker) {
                    beaker.style.animation = '';
                }
            });
        }, 1000);
    }

    // Enhanced CSS animations
    const enhancedStyles = document.createElement('style');
    enhancedStyles.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0) rotate(0deg); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-3px) rotate(-1deg); }
            20%, 40%, 60%, 80% { transform: translateX(3px) rotate(1deg); }
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-20px); }
            60% { transform: translateY(-10px); }
        }
        
        .status-indicator {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, rgba(37, 99, 235, 0.95), rgba(5, 150, 105, 0.95));
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: 600;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .status-indicator.show {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        
        .status-indicator.error {
            background: linear-gradient(135deg, rgba(220, 38, 38, 0.95), rgba(239, 68, 68, 0.95));
        }
        
        .status-indicator.warning {
            background: linear-gradient(135deg, rgba(217, 119, 6, 0.95), rgba(245, 158, 11, 0.95));
        }
        
        .status-indicator.success {
            background: linear-gradient(135deg, rgba(22, 163, 74, 0.95), rgba(34, 197, 94, 0.95));
        }
    `;
    document.head.appendChild(enhancedStyles);

    // Initialize lab with welcome message
    setTimeout(() => {
        showStatusMessage('🧪 Virtual Chemical Lab Ready! Mix some elements!', 'success', 3000);
    }, 1000);

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ' && e.target.tagName !== 'INPUT') {
            e.preventDefault();
            mixButton.click();
        }
        if (e.key === 'r' && e.ctrlKey) {
            e.preventDefault();
            location.reload();
        }
    });

    // Add tooltips for better UX
    function addTooltips() {
        const tooltipElements = document.querySelectorAll('[title]');
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', showTooltip);
            element.addEventListener('mouseleave', hideTooltip);
        });
    }

    function showTooltip(e) {
        // Simplified tooltip implementation
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = e.target.title;
        document.body.appendChild(tooltip);
        
        const rect = e.target.getBoundingClientRect();
        tooltip.style.cssText = `
            position: fixed;
            top: ${rect.top - 40}px;
            left: ${rect.left + rect.width / 2}px;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.85rem;
            pointer-events: none;
            z-index: 1001;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        setTimeout(() => tooltip.style.opacity = '1', 50);
        e.target.tooltipElement = tooltip;
    }

    function hideTooltip(e) {
        if (e.target.tooltipElement) {
            e.target.tooltipElement.remove();
            delete e.target.tooltipElement;
        }
    }

    // Initialize tooltips
    addTooltips();
});
