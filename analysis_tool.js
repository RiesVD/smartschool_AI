const triggerButton = document.querySelector('.trigger-button');
const compareBtn = document.getElementById('compareBtn');
const closeComparisonBtn = document.getElementById('closeComparisonBtn');
const popout = document.querySelector('.popout');
const analysisView = document.getElementById('analysisView');
const comparisonView = document.getElementById('comparisonView');
const canvas = document.getElementById('progressCanvas');
const ctx = canvas.getContext('2d');
const dateTimeElement = document.getElementById('datetime');
const percentageText = document.getElementById('percentageText');
const analyzeBtn = document.getElementById('analyzeBtn');
const subjectSelect = document.getElementById('subjectSelect');
const languageSelect = document.getElementById('languageSelect');
const feedbackContainer = document.getElementById('feedbackContainer');
const comparisonContent = document.getElementById('comparisonContent');
const comparisonRecommendations = document.getElementById('comparisonRecommendations');
const testResultsList = document.getElementById('testResultsList');
const upcomingAssignmentsList = document.getElementById('upcomingAssignmentsList');
const assignmentsToggle = document.getElementById('assignmentsToggle');
const upcomingAssignmentsContent = document.getElementById('upcomingAssignmentsContent');
const performanceDescriptor = document.getElementById('performanceDescriptor');

const LANGUAGE_KEY = 'smartschool_language';

const i18n = {
    nl: {
        selectSubject: 'Selecteer vak',
        overallPerformance: 'Algemene prestaties',
        upcomingHeader: '📅 Aankomende toetsen & opdrachten',
        upcomingDescription: 'Voer verwachte cijfers in om je potentiële gemiddelde te zien',
        improvementTips: '💡 Verbeter tips',
        analyzeButton: 'Analyseren',
        compareButton: 'Vergelijk vakken',
        viewResults: 'Bekijk resultaten',
        testResultsTitle: '📝 Testresultaten',
        noData: 'Geen gegevens',
        noResults: 'Nog geen resultaten geanalyseerd. Analyseer eerst een vak!',
        selectLanguage: 'Selecteer taal',
        pleaseSelectSubject: 'Selecteer eerst een vak',
        comparisonInsight: '📊 Vergelijkingsinzichten:',
        comparisonText: 'Je {0} is {1}% en je {2} is {3}%. Dat is een verschil van {4}%. Focus op het verbeteren van je {2} vaardigheden.',
        focusAreas: '⚠️ Aandachtspunten:',
        strongPoints: '✨ Sterke punten:',
        greatJob: '🎉 Goed gedaan!',
        strongAll: 'Goed gedaan! Alle resultaten zijn sterk. Ga zo door!',
        genericPracticeTip: 'Oefen dit onderwerp',
        focusOnTopic: 'Focus op',
        performanceDescriptors: {
            outstanding: 'Uitmuntend',
            amazing: 'Geweldig',
            great: 'Heel goed',
            good: 'Goed',
            fair: 'Redelijk',
            poor: 'Slecht',
            fail: 'Onvoldoende',
            noData: 'Geen gegevens'
        },
        subjects: {
            math: 'Wiskunde',
            english: 'Engels',
            geography: 'Aardrijkskunde',
            science: 'Wetenschap',
            history: 'Geschiedenis',
            physics: 'Fysica',
            chemistry: 'Chemie'
        },        tests: {
            math: {
                algebra: 'Algebra',
                geometry: 'Meetkunde',
                calculus: 'Calculus',
                statistics: 'Statistiek',
                trigonometry: 'Trigonometrie'
            },
            english: {
                reading: 'Lezen',
                writing: 'Schrijven',
                grammar: 'Grammatica',
                literature: 'Literatuur',
                vocabulary: 'Woordenschat'
            },
            geography: {
                maps: 'Kaarten',
                capitals: 'Hoofdsteden',
                regions: 'Regio\'s',
                population: 'Bevolking',
                climate: 'Klimaat'
            },
            science: {
                biology: 'Biologie',
                chemistry: 'Scheikunde',
                physics: 'Fysica',
                ecology: 'Ecologie',
                astronomy: 'Astronomie'
            },
            history: {
                dates: 'Datums',
                events: 'Gebeurtenissen',
                analysis: 'Analyse',
                civilizations: 'Beschavingen',
                revolution: 'Revolutie'
            },
            physics: {
                mechanics: 'Mechanica',
                energy: 'Energie',
                waves: 'Golf',
                thermodynamics: 'Thermodynamica',
                optics: 'Optica'
            },
            chemistry: {
                reactions: 'Reacties',
                bonding: 'Binding',
                equations: 'Vergelijkingen',
                acids: 'Zuren',
                stoichiometry: 'Stochiometrie'
            }
        },
        tips: {
            math: {
                algebra: 'Oefen algebra\-problemen met vergelijkingen en ongelijkheden.',
                geometry: 'Oefen figuren en bewijzen voor meetkunde.',
                calculus: 'Werk aan limieten en afgeleiden stap voor stap.',
                statistics: 'Interpretatie van data helpt je statistiek te verbeteren.',
                trigonometry: 'Leer relaties tussen hoeken en verhoudingen.'
            },
            geography: {
                maps: 'Gebruik kaarten om locaties en schaal te oefenen.',
                capitals: 'Herhaal hoofdsteden met flashcards.',
                regions: 'Bestudeer kenmerken van verschillende regio\'s.',
                population: 'Analyseer demografische grafieken.',
                climate: 'Kijk naar weerpatronen en klimaatzones.'
            },
            english: {
                reading: 'Lees meer en vat teksten samen met eigen woorden.',
                writing: 'Oefen met verschillende essay-structuren.',
                grammar: 'Maak grammaticatests en corrigeer fouten.',
                literature: 'Bestudeer belangrijke literaire thema\'s.',
                vocabulary: 'Gebruik nieuw vocabulaire in zinnen.'
            },
            science: {
                biology: 'Maak overzichten van systemen in de biologie.',
                chemistry: 'Oefen het balanceren van chemische reacties.',
                physics: 'Visualiseer krachten en beweging met voorbeelden.',
                ecology: 'Begrijp ecosysteemrelaties.',
                astronomy: 'Leer hemellichamen en trajecten.'
            },
            history: {
                dates: 'Maak tijdlijnen voor memorisering.',
                events: 'Analyseer oorzaken en gevolgen van gebeurtenissen.',
                analysis: 'Vergelijk verschillende perspectieven.',
                civilizations: 'Bestudeer culturele kenmerken.',
                revolution: 'Bekijk revoluties in hun context.'
            },
            physics: {
                mechanics: 'Maak praktische rekensommen bij beweging.',
                energy: 'Oefen energiebalans en conservatie.',
                waves: 'Laat zien hoe golven zich voortplanten.',
                thermodynamics: 'Begrijp warmte en werk.',
                optics: 'Praktiseer lichtbreking en lenzen.'
            },
            chemistry: {
                reactions: 'Ken typen reacties en reactiesnelheid.',
                bonding: 'Herhaal moleculaire bindingen.',
                equations: 'Oefen stoichiometrie met berekeningen.',
                acids: 'Begrijp pH en neutralisatie.',
                stoichiometry: 'Los stapsgewijs molberekeningen op.'
            }
        },        months: ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december']
    },
    en: {
        selectSubject: 'Select Subject',
        overallPerformance: 'Overall Performance',
        upcomingHeader: '📅 Upcoming Tests & Assignments',
        upcomingDescription: 'Enter expected results to see your potential average',
        improvementTips: '💡 Improvement Tips',
        analyzeButton: 'Analyze',
        compareButton: 'Compare Subjects',
        viewResults: 'View Results',
        testResultsTitle: '📝 Test Results',
        noData: 'No Data',
        noResults: 'No analyzed results yet. Analyze some subjects first!',
        selectLanguage: 'Select language',
        pleaseSelectSubject: 'Please select a subject first',
        comparisonInsight: '📊 Comparison Insight:',
        comparisonText: 'Your {0} is at {1}% and your {2} is at {3}%. That\'s a {4}% difference! Focus on improving your {2} skills.',
        focusAreas: '⚠️ Focus Areas:',
        strongPoints: '✨ Strong Points:',
        greatJob: '🎉 Great Job!',
        strongAll: 'Great job! All your test results are strong. Keep it up!',
        genericPracticeTip: 'Practice this topic',
        focusOnTopic: 'Focus on',
        performanceDescriptors: {
            outstanding: 'Outstanding',
            amazing: 'Amazing',
            great: 'Great',
            good: 'Good',
            fair: 'Fair',
            poor: 'Poor',
            fail: 'Fail',
            noData: 'No Data'
        },
        subjects: {
            math: 'Math',
            english: 'English',
            geography: 'Geography',
            science: 'Science',
            history: 'History',
            physics: 'Physics',
            chemistry: 'Chemistry'
        },
        tests: {
            math: {
                algebra: 'Algebra',
                geometry: 'Geometry',
                calculus: 'Calculus',
                statistics: 'Statistics',
                trigonometry: 'Trigonometry'
            },
            english: {
                reading: 'Reading',
                writing: 'Writing',
                grammar: 'Grammar',
                literature: 'Literature',
                vocabulary: 'Vocabulary'
            },
            geography: {
                maps: 'Maps',
                capitals: 'Capitals',
                regions: 'Regions',
                population: 'Population',
                climate: 'Climate'
            },
            science: {
                biology: 'Biology',
                chemistry: 'Chemistry',
                physics: 'Physics',
                ecology: 'Ecology',
                astronomy: 'Astronomy'
            },
            history: {
                dates: 'Dates',
                events: 'Events',
                analysis: 'Analysis',
                civilizations: 'Civilizations',
                revolution: 'Revolution'
            },
            physics: {
                mechanics: 'Mechanics',
                energy: 'Energy',
                waves: 'Waves',
                thermodynamics: 'Thermodynamics',
                optics: 'Optics'
            },
            chemistry: {
                reactions: 'Reactions',
                bonding: 'Bonding',
                equations: 'Equations',
                acids: 'Acids',
                stoichiometry: 'Stoichiometry'
            }
        },
        tips: {
            math: {
                algebra: 'Practice equation solving and algebraic manipulation.',
                geometry: 'Focus on visualizing shapes and understanding proofs.',
                calculus: 'Build stepwise understanding of derivatives and integrals.',
                statistics: 'Interpret data sets and probability statements.',
                trigonometry: 'Review angle relationships and trigonometric identities.'
            },
            geography: {
                maps: 'Practice reading maps and using scale properly.',
                capitals: 'Learn capital cities with flashcards.',
                regions: 'Study characteristics of different world regions.',
                population: 'Analyze population charts and trends.',
                climate: 'Study climate zones and weather patterns.'
            },
            english: {
                reading: 'Read regularly and summarize key ideas.',
                writing: 'Write essays with structure and clear arguments.',
                grammar: 'Practice grammar exercises and corrections.',
                literature: 'Explore themes in major literary works.',
                vocabulary: 'Use new words in sentences to retain them.'
            },
            science: {
                biology: 'Review biological processes and diagrams.',
                chemistry: 'Practice balancing equations and reactions.',
                physics: 'Work through force and energy problems.',
                ecology: 'Understand ecosystems and relationships.',
                astronomy: 'Study celestial movement and bodies.'
            },
            history: {
                dates: 'Use timelines to memorize key dates.',
                events: 'Analyze causes and effects of major events.',
                analysis: 'Compare multiple historical perspectives.',
                civilizations: 'Review major world civilizations and features.',
                revolution: 'Examine the historical context of revolutions.'
            },
            physics: {
                mechanics: 'Solve motion and force word problems.',
                energy: 'Practice energy conservation and work problems.',
                waves: 'Understand wave behavior and properties.',
                thermodynamics: 'Review heat, work, and energy transfer.',
                optics: 'Practice ray diagrams and refraction problems.'
            },
            chemistry: {
                reactions: 'Practice reaction types and balancing equations.',
                bonding: 'Review ionic and covalent bond structure.',
                equations: 'Do stoichiometry calculations and conversions.',
                acids: 'Study pH, titration, and acid/base behavior.',
                stoichiometry: 'Work through mole ratio calculations.'
            }
        },
        months: ['January','February','March','April','May','June','July','August','September','October','November','December']
    },
    fr: {
        selectSubject: 'Choisir une matière',
        overallPerformance: 'Performance globale',
        upcomingHeader: '📅 Tests & devoirs à venir',
        upcomingDescription: 'Entrez les résultats attendus pour voir votre moyenne potentielle',
        improvementTips: '💡 Conseils d’amélioration',
        analyzeButton: 'Analyser',
        compareButton: 'Comparer les matières',
        viewResults: 'Voir les résultats',
        testResultsTitle: '📝 Résultats des tests',
        noData: 'Pas de données',
        noResults: 'Aucun résultat analysé pour le moment. Analysez d’abord une matière !',
        selectLanguage: 'Choisissez la langue',
        pleaseSelectSubject: 'Veuillez d’abord sélectionner une matière',
        comparisonInsight: '📊 Aperçu de la comparaison :',
        comparisonText: 'Votre {0} est à {1}% et votre {2} est à {3}%. C\'est une différence de {4}% ! Concentrez-vous sur l\'amélioration de vos compétences en {2}.',
        focusAreas: '⚠️ Points à améliorer :',
        strongPoints: '✨ Points forts :',
        greatJob: '🎉 Beau travail !',
        strongAll: 'Bon travail ! Tous vos résultats sont solides. Continuez comme ça !',
        genericPracticeTip: 'Pratiquez ce sujet',
        focusOnTopic: 'Concentrez-vous sur',
        performanceDescriptors: {
            outstanding: 'Exceptionnel',
            amazing: 'Incroyable',
            great: 'Super',
            good: 'Bon',
            fair: 'Moyen',
            poor: 'Faible',
            fail: 'Échec',
            noData: 'Pas de données'
        },
        subjects: {
            math: 'Mathématiques',
            english: 'Anglais',
            geography: 'Géographie',
            science: 'Sciences',
            history: 'Histoire',
            physics: 'Physique',
            chemistry: 'Chimie'
        },
        tests: {
            math: {
                algebra: 'Algèbre',
                geometry: 'Géométrie',
                calculus: 'Analyse',
                statistics: 'Statistiques',
                trigonometry: 'Trigonométrie'
            },
            english: {
                reading: 'Lecture',
                writing: 'Écriture',
                grammar: 'Grammaire',
                literature: 'Littérature',
                vocabulary: 'Vocabulaire'
            },
            geography: {
                maps: 'Cartes',
                capitals: 'Capitales',
                regions: 'Régions',
                population: 'Population',
                climate: 'Climat'
            },
            science: {
                biology: 'Biologie',
                chemistry: 'Chimie',
                physics: 'Physique',
                ecology: 'Écologie',
                astronomy: 'Astronomie'
            },
            history: {
                dates: 'Dates',
                events: 'Événements',
                analysis: 'Analyse',
                civilizations: 'Civilisations',
                revolution: 'Révolution'
            },
            physics: {
                mechanics: 'Mécanique',
                energy: 'Énergie',
                waves: 'Ondes',
                thermodynamics: 'Thermodynamique',
                optics: 'Optique'
            },
            chemistry: {
                reactions: 'Réactions',
                bonding: 'Liaison',
                equations: 'Équations',
                acids: 'Acides',
                stoichiometry: 'Stœchiométrie'
            }
        },
        tips: {
            math: {
                algebra: 'Pratiquez les équations et manipulations algébriques.',
                geometry: 'Travaillez la visualisation des figures et preuves.',
                calculus: 'Comprenez les limites et les dérivées pas à pas.',
                statistics: 'Analysez des ensembles de données en détail.',
                trigonometry: 'Révisez les relations d\'angles et formules trigonométriques.'
            },
            geography: {
                maps: 'Utilisez des cartes pour revoir l\'échelle et les emplacements.',
                capitals: 'Apprenez les capitales avec des flashcards.',
                regions: 'Étudiez les caractéristiques sociales et physiques.',
                population: 'Examinez les graphiques démographiques.',
                climate: 'Comprenez les zones climatiques et les saisons.'
            },
            english: {
                reading: 'Lisez plus pour améliorer la compréhension.',
                writing: 'Rédigez des essais avec structure claire.',
                grammar: 'Faites des exercices de grammaire réguliers.',
                literature: 'Identifiez thèmes et techniques littéraires.',
                vocabulary: 'Apprenez de nouveaux mots contextuellement.'
            },
            science: {
                biology: 'Révisez les processus et systèmes biologiques.',
                chemistry: 'Équilibrez les réactions et formulez des astuces.',
                physics: 'Visualisez forces et énergie dans des exemples.',
                ecology: 'Comprenez les interactions des écosystèmes.',
                astronomy: 'Étudiez les mouvements des corps célestes.'
            },
            history: {
                dates: 'Créez des frises chronologiques pour retenir les dates.',
                events: 'Analysez causes et effets des événements.',
                analysis: 'Comparez différentes interprétations historiques.',
                civilizations: 'Revue des caractéristiques des civilisations.',
                revolution: 'Contextualisez les révolutions majeures.'
            },
            physics: {
                mechanics: 'Résolvez des problèmes sur mouvement et forces.',
                energy: 'Pratiquez l\'énergie et le travail.',
                waves: 'Étudiez la propagation et fréquence des ondes.',
                thermodynamics: 'Comprenez chaleur et échanges d\'énergie.',
                optics: 'Pratiquez réfraction et lois des lentilles.'
            },
            chemistry: {
                reactions: 'Connaissez les types de réactions et équilibrage.',
                bonding: 'Révisez ionicité et covalence.',
                equations: 'Pratiquez stœchiométrie sur des exercices.',
                acids: 'Étudiez pH et titrations.',
                stoichiometry: 'Travaillez les rapports molaires.'
            }
        },
        months: ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre']
    }
};

let currentLanguage = localStorage.getItem(LANGUAGE_KEY) || 'nl';

function t(path) {
    const parts = path.split('.');
    let value = i18n[currentLanguage] || i18n['nl'];
    for (const part of parts) {
        value = value && value[part];
    }
    return value || path;
}

function formatString(str, ...args) {
    if (!str) return '';
    return str.replace(/{(\d+)}/g, (match, index) => {
        return typeof args[index] !== 'undefined' ? args[index] : match;
    });
}

function localizeSubject(subjectKey) {
    return (i18n[currentLanguage]?.subjects?.[subjectKey] || subjectKey);
}

function setLanguage(language) {
    currentLanguage = language;
    localStorage.setItem(LANGUAGE_KEY, language);

    // UI translations
    triggerButton.querySelector('span').textContent = t('viewResults');
    document.getElementById('languageLabel').textContent = t('selectLanguage');
    document.getElementById('subjectLabel').textContent = t('selectSubject');
    subjectSelect.querySelector('option[value=""]').textContent = t('selectSubject');
    document.querySelector('.progress-label').textContent = t('overallPerformance');
    document.querySelector('.assignments-header').textContent = t('upcomingHeader');
    document.querySelector('.assignments-description').textContent = t('upcomingDescription');
    document.querySelector('.tips-header').textContent = t('improvementTips');
    document.querySelector('.test-results-title').textContent = t('testResultsTitle');
    analyzeBtn.textContent = t('analyzeButton');
    compareBtn.textContent = t('compareButton');

    // Update subject options
    for (const option of subjectSelect.options) {
        if (option.value && i18n[currentLanguage].subjects[option.value]) {
            option.textContent = localizeSubject(option.value);
        }
    }

    // Redraw dynamic blocks
    if (selectedSubject) {
        displayUpcomingAssignments();
        displayComparisonView();
        performanceDescriptor.textContent = getPerformanceDescriptor(currentPercentage);
    }
}


let currentPercentage = 0;
let selectedSubject = '';
let currentTestResults = {};
let upcomingAssignments = {};

// Storage keys
const STORAGE_KEY = 'smartschool_results';
const ASSIGNMENTS_KEY = 'smartschool_assignments';
const allSubjects = ['math', 'english', 'geography', 'science', 'history', 'physics', 'chemistry'];

const testTypeKeys = {
    math: ['algebra', 'geometry', 'calculus', 'statistics', 'trigonometry'],
    english: ['reading', 'writing', 'grammar', 'literature', 'vocabulary'],
    geography: ['maps', 'capitals', 'regions', 'population', 'climate'],
    science: ['biology', 'chemistry', 'physics', 'ecology', 'astronomy'],
    history: ['dates', 'events', 'analysis', 'civilizations', 'revolution'],
    physics: ['mechanics', 'energy', 'waves', 'thermodynamics', 'optics'],
    chemistry: ['reactions', 'bonding', 'equations', 'acids', 'stoichiometry']
};

// Initialize storage
function initializeStorage() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
    }
    if (!localStorage.getItem(ASSIGNMENTS_KEY)) {
        localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify({}));
    }
}

// Get all stored results
function getStoredResults() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
}

// Save result for a subject
function saveResult(subject, percentage) {
    const results = getStoredResults();
    results[subject] = percentage;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
}

// Get result for a subject
function getResult(subject) {
    const results = getStoredResults();
    return results[subject] || null;
}

// Get stored assignments
function getStoredAssignments() {
    return JSON.parse(localStorage.getItem(ASSIGNMENTS_KEY) || '{}');
}

// Save assignments
function saveAssignments(subject, assignments) {
    const all = getStoredAssignments();
    all[subject] = assignments;
    localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(all));
}

// Get performance descriptor based on percentage
function getPerformanceDescriptor(percentage) {
    if (percentage >= 90) {
        return t('performanceDescriptors.outstanding');
    } else if (percentage >= 80) {
        return t('performanceDescriptors.amazing');
    } else if (percentage >= 70) {
        return t('performanceDescriptors.great');
    } else if (percentage >= 60) {
        return t('performanceDescriptors.good');
    } else if (percentage >= 50) {
        return t('performanceDescriptors.fair');
    } else if (percentage >= 40) {
        return t('performanceDescriptors.poor');
    } else if (percentage > 0) {
        return t('performanceDescriptors.fail');
    } else {
        return t('performanceDescriptors.noData');
    }
}

// Get color for percentage
function getColorForPercentage(percentage) {
    if (percentage <= 50) {
        return { color: '#e74c3c', name: 'red' };
    } else if (percentage <= 65) {
        return { color: '#f39c12', name: 'yellow' };
    } else {
        return { color: '#2ecc71', name: 'green' };
    }
}

// Toggle popout visibility
triggerButton.addEventListener('click', () => {
    popout.classList.toggle('active');
    if (popout.classList.contains('active')) {
        analysisView.style.display = 'flex';
        comparisonView.style.display = 'none';
        updateDateTime();
    }
});

// Show comparison view
compareBtn.addEventListener('click', () => {
    analysisView.style.display = 'none';
    comparisonView.style.display = 'flex';
    displayComparisonView();
});

// Close comparison and go back to analysis
closeComparisonBtn.addEventListener('click', () => {
    analysisView.style.display = 'flex';
    comparisonView.style.display = 'none';
});

// Toggle upcoming assignments visibility
assignmentsToggle.addEventListener('click', () => {
    assignmentsToggle.classList.toggle('collapsed');
    upcomingAssignmentsContent.classList.toggle('collapsed');
});

// Close popout when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.container') && !e.target.closest('.popout')) {
        popout.classList.remove('active');
    }
});

// Display comparison view
function displayComparisonView() {
    const results = getStoredResults();
    const analyzedSubjects = [];

    for (const subject of allSubjects) {
        if (results[subject] !== undefined) {
            const percentage = results[subject];
            const colorInfo = getColorForPercentage(percentage);
            analyzedSubjects.push({
                name: localizeSubject(subject),
                key: subject,
                percentage: percentage,
                color: colorInfo.color,
                colorName: colorInfo.name
            });
        }
    }

    analyzedSubjects.sort((a, b) => b.percentage - a.percentage);

    if (analyzedSubjects.length === 0) {
        comparisonContent.innerHTML = `<p class="no-results">${t('noResults')}</p>`;
        comparisonRecommendations.innerHTML = '';
        return;
    }

    let listHTML = '<div class="comparison-list">';
    for (const subject of analyzedSubjects) {
        listHTML += `
            <div class="comparison-item">
                <div class="comparison-item-left">
                    <span class="comparison-subject">${subject.name}</span>
                </div>
                <div class="comparison-item-right">
                    <div class="comparison-bar-container">
                        <div class="comparison-bar" style="width: ${subject.percentage}%; background-color: ${subject.color};"></div>
                    </div>
                    <span class="comparison-percentage" style="color: ${subject.color};">${subject.percentage}%</span>
                </div>
            </div>
        `;
    }
    listHTML += '</div>';
    comparisonContent.innerHTML = listHTML;

    generateRecommendations(analyzedSubjects);
}

// Generate recommendations
function generateRecommendations(subjects) {
    const strongSubjects = subjects.filter(s => s.percentage >= 80);
    const needsFocusSubjects = subjects.filter(s => s.percentage < 65);
    const sortedSubjects = [...subjects].sort((a, b) => b.percentage - a.percentage);

    let recommendationsHTML = '<div class="recommendations-container">';

    if (sortedSubjects.length >= 2) {
        const best = sortedSubjects[0];
        const worst = sortedSubjects[sortedSubjects.length - 1];
        const difference = Math.round(best.percentage - worst.percentage);
        const comparisonSentence = formatString(t('comparisonText'), best.name, best.percentage, worst.name, worst.percentage, difference);
        
        recommendationsHTML += '<div class="recommendation-section">';
        recommendationsHTML += `<h4>${t('comparisonInsight')}</h4>`;
        recommendationsHTML += `<p>${comparisonSentence}</p>`;
        recommendationsHTML += '</div>';
    }

    if (needsFocusSubjects.length > 0) {
        recommendationsHTML += '<div class="recommendation-section">';
        recommendationsHTML += `<h4>${t('focusAreas')}</h4>`;
        recommendationsHTML += '<ul>';
        for (const subject of needsFocusSubjects) {
            recommendationsHTML += `<li>${subject.name} (${subject.percentage}%)</li>`;
        }
        recommendationsHTML += '</ul></div>';
    }

    if (strongSubjects.length > 0) {
        recommendationsHTML += '<div class="recommendation-section">';
        recommendationsHTML += `<h4>${t('strongPoints')}</h4>`;
        recommendationsHTML += '<ul>';
        for (const subject of strongSubjects) {
            recommendationsHTML += `<li>${subject.name} (${subject.percentage}%)</li>`;
        }
        recommendationsHTML += '</ul></div>';
    }

    recommendationsHTML += '</div>';
    comparisonRecommendations.innerHTML = recommendationsHTML;
}

// Capitalize subject name
function capitalizeSubject(subject) {
    return subject.charAt(0).toUpperCase() + subject.slice(1);
}

function getLocalizedTestName(subject, testKey) {
    return i18n[currentLanguage]?.tests?.[subject]?.[testKey] ||
           i18n['en']?.tests?.[subject]?.[testKey] ||
           (testKey.charAt(0).toUpperCase() + testKey.slice(1));
}

// Handle subject selection
subjectSelect.addEventListener('change', (e) => {
    selectedSubject = e.target.value;
    feedbackContainer.classList.remove('show');
    testResultsList.innerHTML = '';
    upcomingAssignmentsList.innerHTML = '';
    currentTestResults = {};
    
    if (selectedSubject) {
        const savedResult = getResult(selectedSubject);
        if (savedResult !== null) {
            currentPercentage = savedResult;
            drawHalfCircle(currentPercentage);
            percentageText.textContent = currentPercentage + '%';
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            percentageText.textContent = '0%';
            performanceDescriptor.textContent = 'No Data';
            currentPercentage = 0;
        }
        
        // Display upcoming assignments
        displayUpcomingAssignments();
    }
});

// Generate mock test results
function generateMockTestResults() {
    const testKeys = testTypeKeys[selectedSubject] || ['test1', 'test2', 'test3', 'test4', 'test5'];
    const localizedTests = i18n[currentLanguage]?.tests?.[selectedSubject] || i18n['en']?.tests?.[selectedSubject] || {};
    const results = {};
    let total = 0;

    for (const key of testKeys) {
        const score = Math.floor(Math.random() * 101);
        results[key] = score;
        total += score;
    }

    const average = Math.round(total / testKeys.length);
    currentTestResults = results;
    currentPercentage = average;

    return results;
}

// Display test results
function displayTestResults() {
    let html = '';
    for (const [testKey, score] of Object.entries(currentTestResults)) {
        const color = score >= 80 ? '#2ecc71' : score >= 65 ? '#f39c12' : '#e74c3c';
        const testName = getLocalizedTestName(selectedSubject, testKey);
        html += `
            <div class="test-result-item">
                <span class="test-result-name">${testName}</span>
                <span class="test-result-score" style="color: ${color};">${score}%</span>
            </div>
        `;
    }
    testResultsList.innerHTML = html;
}

// Display upcoming assignments for input
function displayUpcomingAssignments() {
    const assignmentTypes = {
        math: ['Algebra Assignment', 'Geometry Assignment', 'Calculus Assignment'],
        english: ['Reading Task', 'Writing Task', 'Grammar Task'],
        geography: ['Map Assignment', 'Capitals Assignment', 'Regions Assignment'],
        science: ['Biology Lab', 'Chemistry Lab', 'Physics Lab'],
        history: ['Research Paper', 'Timeline Assignment', 'Analysis Essay'],
        physics: ['Mechanics Problem Set', 'Energy Lab', 'Wave Assignment'],
        chemistry: ['Reaction Lab', 'Bonding Problem Set', 'Equation Practice']
    };

    const assignments = assignmentTypes[selectedSubject] || ['Assignment 1', 'Assignment 2', 'Assignment 3'];
    const stored = getStoredAssignments()[selectedSubject] || {};

    let html = '';
    for (const assignment of assignments) {
        const value = stored[assignment] || '';
        html += `
            <div class="assignment-input-group">
                <label class="assignment-label">${assignment}</label>
                <div class="assignment-input-wrapper">
                    <input 
                        type="number" 
                        min="0" 
                        max="100" 
                        value="${value}"
                        class="assignment-input" 
                        data-assignment="${assignment}"
                        placeholder="0"
                    >
                    <span class="assignment-percent">%</span>
                </div>
            </div>
        `;
    }

    upcomingAssignmentsList.innerHTML = html;

    // Add event listeners to inputs
    document.querySelectorAll('.assignment-input').forEach(input => {
        // Real-time validation on input
        input.addEventListener('input', (e) => {
            const rawValue = e.target.value.trim();

            if (rawValue === '') {
                e.target.value = '';
                simulatePercentage();
                return;
            }

            let value = parseInt(rawValue, 10);
            if (Number.isNaN(value)) {
                e.target.value = '';
                simulatePercentage();
                return;
            }

            value = Math.min(100, Math.max(0, value));
            e.target.value = value;
            simulatePercentage();
        });

        input.addEventListener('change', saveUpcomingAssignments);
    });
}

// Save upcoming assignments
function saveUpcomingAssignments() {
    if (!selectedSubject) return;
    
    const assignments = {};
    document.querySelectorAll('.assignment-input').forEach(input => {
        const rawValue = input.value.trim();
        if (rawValue === '') return;

        const value = parseInt(rawValue, 10);
        if (!Number.isNaN(value)) {
            assignments[input.dataset.assignment] = Math.min(100, Math.max(0, value));
        }
    });

    saveAssignments(selectedSubject, assignments);
}

function clearUpcomingAssignments() {
    if (!selectedSubject) return;

    document.querySelectorAll('.assignment-input').forEach(input => {
        input.value = '';
    });

    saveAssignments(selectedSubject, {});
}

// Simulate percentage with upcoming assignments
function simulatePercentage() {
    if (!selectedSubject) return;

    const inputs = document.querySelectorAll('.assignment-input');
    const values = Array.from(inputs)
        .map(input => input.value ? parseInt(input.value) : null)
        .filter(val => val !== null);

    if (values.length === 0) {
        drawHalfCircle(currentPercentage);
        percentageText.textContent = currentPercentage + '%';
        return;
    }

    // Calculate average of current tests and upcoming assignments
    const currentTests = Object.values(currentTestResults).length > 0 
        ? Object.values(currentTestResults).reduce((a, b) => a + b, 0) / Object.values(currentTestResults).length
        : currentPercentage;

    const upcomingAverage = values.reduce((a, b) => a + b, 0) / values.length;
    const combinedAverage = Math.round((currentTests + upcomingAverage) / 2);

    drawHalfCircle(combinedAverage);
    percentageText.textContent = combinedAverage + '%';
}

// Generate tips based on test results
function generateTipsFromTestResults() {
    const subjectTips = i18n[currentLanguage]?.tips?.[selectedSubject] || i18n['en']?.tips?.[selectedSubject] || {};
    const weakTests = Object.entries(currentTestResults)
        .filter(([_, score]) => score < 70)
        .map(([testKey, score]) => {
            const tip = subjectTips[testKey] || t('genericPracticeTip');
            const testName = getLocalizedTestName(selectedSubject, testKey);
            return { testName, score, tip };
        });

    if (weakTests.length > 0) {
        let html = '<ul>';
        for (const weak of weakTests) {
            const prefix = formatString(t('focusOnTopic'), weak.testName);
            html += `<li>${prefix}: ${weak.tip}</li>`;
        }
        html += '</ul>';
        feedbackContainer.innerHTML = html;
        feedbackContainer.classList.add('show');
    } else {
        feedbackContainer.innerHTML = `<ul><li>${t('strongAll')}</li></ul>`;
        feedbackContainer.classList.add('show');
    }
}

// Generate random percentage and draw half-circle
function generateRandomPercentage() {
    generateMockTestResults();
    displayTestResults();
    drawHalfCircle(currentPercentage);
    percentageText.textContent = currentPercentage + '%';
    generateTipsFromTestResults();
    saveResult(selectedSubject, currentPercentage);
}

// Draw full circle progress indicator
function drawHalfCircle(percentage) {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 70;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background full circle (light gray)
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    ctx.stroke();

    let color;
    if (percentage <= 50) {
        color = '#e74c3c';
    } else if (percentage <= 65) {
        color = '#f39c12';
    } else {
        color = '#2ecc71';
    }

    // Draw progress arc (full circle filled)
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.beginPath();
    const endAngle = (2 * Math.PI * (percentage / 100));
    ctx.arc(centerX, centerY, radius, 0, endAngle, false);
    ctx.stroke();

    percentageText.style.color = color;
    performanceDescriptor.style.color = color;
    performanceDescriptor.textContent = getPerformanceDescriptor(percentage);
}

// Generate feedback based on subject and percentage
function generateFeedback() {
    const improvementTips = {
        math: {
            low: ['Practice fundamental equations', 'Review algebraic concepts', 'Work on problem-solving techniques'],
            medium: ['Improve calculation speed', 'Focus on complex problem types', 'Review recent test topics'],
            high: ['Master advanced topics', 'Start competition prep', 'Help peers with concepts']
        },
        english: {
            low: ['Improve vocabulary', 'Practice writing essays', 'Focus on grammar rules'],
            medium: ['Enhance reading comprehension', 'Work on writing clarity', 'Study literary analysis'],
            high: ['Explore advanced literature', 'Refine writing style', 'Take leadership in class discussions']
        },
        geography: {
            low: ['Study world capitals', 'Learn about continents', 'Practice map skills'],
            medium: ['Understand climate zones', 'Study economic regions', 'Learn cultural geography'],
            high: ['Explore geopolitics', 'Study sustainability issues', 'Master advanced map analysis']
        },
        science: {
            low: ['Review scientific method basics', 'Study element properties', 'Practice lab techniques'],
            medium: ['Understand chemical reactions', 'Focus on biology concepts', 'Study physics principles'],
            high: ['Explore advanced experiments', 'Master complex theories', 'Lead lab discussions']
        },
        history: {
            low: ['Learn key dates and events', 'Study major historical figures', 'Focus on timeline understanding'],
            medium: ['Understand cause and effect', 'Study different perspectives', 'Analyze historical sources'],
            high: ['Explore historiography', 'Debate historical interpretations', 'Research advanced topics']
        },
        physics: {
            low: ['Review fundamental laws', 'Practice force calculations', 'Study motion concepts'],
            medium: ['Master energy principles', 'Focus on wave theory', 'Study thermodynamics'],
            high: ['Explore quantum mechanics', 'Master complex equations', 'Conduct advanced experiments']
        },
        chemistry: {
            low: ['Study periodic table', 'Learn bonding basics', 'Practice stoichiometry'],
            medium: ['Understand reactions deeply', 'Focus on acid-base chemistry', 'Study equilibrium'],
            high: ['Explore organic chemistry', 'Master reaction mechanisms', 'Lead chemistry experiments']
        }
    };

    const motivationalMessages = {
        math: ['Outstanding work in Math!', 'You\'re a math wizard! 🧙', 'Exceptional mathematical thinking!', 'You\'ve mastered this level!'],
        english: ['Excellent English skills!', 'Your writing is outstanding!', 'Perfect command of the language!', 'You\'re an English champion!'],
        geography: ['Geography master!', 'Your geographic knowledge is impressive!', 'You\'ve conquered geography!', 'Excellent geographic understanding!'],
        science: ['Brilliant scientific mind!', 'You\'re a science superstar!', 'Exceptional scientific thinking!', 'Outstanding science knowledge!'],
        history: ['History expert!', 'Exceptional historical knowledge!', 'You\'re a history champion!', 'Brilliant historical understanding!'],
        physics: ['Physics wizard!', 'Outstanding physics mastery!', 'You\'ve conquered physics!', 'Exceptional physics thinking!'],
        chemistry: ['Chemistry genius!', 'Outstanding chemical knowledge!', 'You\'re a chemistry master!', 'Brilliant chemistry understanding!']
    };

    if (!selectedSubject) {
        return { type: 'none' };
    }

    if (currentPercentage >= 80) {
        const messages = motivationalMessages[selectedSubject] || [];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        return { 
            type: 'motivation',
            message: randomMessage
        };
    }

    let level = 'low';
    if (currentPercentage > 65) {
        level = 'high';
    } else if (currentPercentage > 50) {
        level = 'medium';
    }

    const tips = improvementTips[selectedSubject][level] || [];
    return {
        type: 'tips',
        tips: tips
    };
}

// Analyze button click handler
analyzeBtn.addEventListener('click', () => {
    if (!selectedSubject) {
        alert(t('pleaseSelectSubject'));
        return;
    }
    
    generateRandomPercentage();
    clearUpcomingAssignments();
    
    const feedback = generateFeedback();
    
    if (feedback.type === 'motivation') {
        feedbackContainer.innerHTML = `
            <h4>🎉 Great Job!</h4>
            <p style="margin: 0; color: #333; font-size: 13px;">${feedback.message}</p>
        `;
    } else if (feedback.type === 'tips') {
        feedbackContainer.innerHTML = `
            <h4>💡 Areas to Improve:</h4>
            <ul>
                ${feedback.tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        `;
    }
    
    if (feedback.type !== 'none') {
        feedbackContainer.classList.add('show');
    }
});

// Update date and time in custom format
function updateDateTime() {
    const now = new Date();
    const months = i18n[currentLanguage]?.months || i18n['en'].months;
    
    const month = months[now.getMonth()];
    const day = now.getDate();
    const year = now.getFullYear();
    
    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) suffix = 'st';
    else if (day === 2 || day === 22) suffix = 'nd';
    else if (day === 3 || day === 23) suffix = 'rd';
    
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    dateTimeElement.textContent = `${month} ${day}${suffix}, ${year}, ${hours}:${minutes} ${ampm}`;
}

// Update time every second
setInterval(updateDateTime, 1000);

// Initialize on page load
initializeStorage();

// Set default language and localize UI
languageSelect.value = currentLanguage;
setLanguage(currentLanguage);

languageSelect.addEventListener('change', (e) => {
    setLanguage(e.target.value);
});

// Initialize assignments section as collapsed
assignmentsToggle.classList.add('collapsed');
upcomingAssignmentsContent.classList.add('collapsed');
