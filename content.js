/* =====================================================================
   EDIT THIS FILE to change anything on the website. No other file needs
   touching for day-to-day updates. Save, refresh the browser, done.
   Each text has English (en) and Hindi (hi).
   ===================================================================== */
window.SITE = {

  config: {
    name: { en: "Jhusi Silai Centre", hi: "झूँसी सिलाई सेंटर" },
    address: "Near Chamanganj Bazar, Jhusi, Prayagraj, Uttar Pradesh 211019",
    mapQuery: "Chamanganj Bazar, Jhusi, Prayagraj, Uttar Pradesh",   // shop name or "lat,lng"

    // PHONE / EMAIL ARE HIDDEN FROM BOTS. Never type them in plain text.
    // Make the encoded values with:   python3 encode.py 919876543210
    // (country code + number, no + or spaces)
    phoneEnc: "NzI3NDg1NDUwNzE5",
    phoneMask: "+91 705••• ••••",                   // what visitors see before tapping
    emailEnc: "bW9jLmxpYW1nQDgyMXllZG5hcG5pcGl2",

    formspree: ""                                  // e.g. "https://formspree.io/f/xxxxxxx"
  },

  // Rotating headline bar at the very top
  announce: [
    { en: "🚚 2-Day Delivery Promise on regular blouse & petticoat*", hi: "🚚 साधारण ब्लाउज़ व पेटीकोट पर 2 दिन में डिलीवरी का वादा*" },
    { en: "💰 Stitching from just ₹150 minimum*", hi: "💰 सिलाई सिर्फ़ ₹150 न्यूनतम से शुरू*" },
    { en: "📏 Perfect-fit guarantee or we re-stitch", hi: "📏 परफेक्ट फिटिंग की गारंटी, वरना दोबारा सिलाई" },
    { en: "🏠 Optional pickup & drop at your home (extra charge, pay first)", hi: "🏠 घर से पिकअप और ड्रॉप का विकल्प (अतिरिक्त शुल्क, पेमेंट पहले)" }
  ],

  // "Our Promises" cards under the hero
  promises: [
    { icon: "⏱", title: { en: "2-Day Delivery", hi: "2 दिन में डिलीवरी" }, text: { en: "Regular designs ready in 2 days. Heavy & bridal work on quote.", hi: "साधारण डिज़ाइन 2 दिन में तैयार। भारी/दुल्हन वर्क कोटेशन पर।" } },
    { icon: "📏", title: { en: "Perfect Fit", hi: "परफेक्ट फिटिंग" }, text: { en: "Not comfortable? Tell us and we will set the fitting right.", hi: "आरामदायक न लगे तो बताइए, हम फिटिंग ठीक कर देंगे।" } },
    { icon: "🧵", title: { en: "Neat Finishing", hi: "सुंदर फिनिशिंग" }, text: { en: "Strong stitches, clean piping and lining.", hi: "मज़बूत सिलाई, साफ़ पाइपिंग और लाइनिंग।" } },
    { icon: "🏠", title: { en: "Pickup & Drop (optional)", hi: "पिकअप और ड्रॉप (वैकल्पिक)" }, text: { en: "Don't want to come? We collect and deliver for a small extra charge. Payment first.", hi: "आना नहीं चाहते? थोड़े अतिरिक्त शुल्क पर हम ले जाते और पहुँचाते हैं। पेमेंट पहले।" } },
    { icon: "💰", title: { en: "Honest Price", hi: "सही दाम" }, text: { en: "Rate told upfront. No hidden charges.", hi: "रेट पहले बताया जाता है। कोई छुपा चार्ज नहीं।" } }
  ],

  // Pickup & drop is an OPTIONAL PAID add-on, payment first. Set your own wording and charge.
  pickup: {
    note: { en: "Pickup & drop is optional and adds to the price. Payment must be made first (online/UPI) - we confirm the exact amount on WhatsApp before pickup.", hi: "पिकअप और ड्रॉप वैकल्पिक है और इससे कीमत बढ़ती है। पेमेंट पहले करना होगा (ऑनलाइन/UPI) - पिकअप से पहले हम व्हाट्सऐप पर सही रकम बताएँगे।" },
    steps: [
      { icon: "📞", title: { en: "Book a pickup", hi: "पिकअप बुक करें" }, text: { en: "Choose pickup in the form below and share your location. We confirm the charge on WhatsApp.", hi: "नीचे फ़ॉर्म में पिकअप चुनें और लोकेशन भेजें। शुल्क हम व्हाट्सऐप पर बताएँगे।" } },
      { icon: "💳", title: { en: "Pay first", hi: "पेमेंट पहले" }, text: { en: "Pay online (UPI) first. Pickup is scheduled after payment.", hi: "पहले ऑनलाइन (UPI) पेमेंट करें। पेमेंट के बाद पिकअप तय होगा।" } },
      { icon: "📏", title: { en: "We visit & measure", hi: "हम आकर नाप लेंगे" }, text: { en: "We collect your fabric and take measurements at your door.", hi: "हम आपके दरवाज़े पर कपड़ा लेते और नाप लेते हैं।" } },
      { icon: "🚚", title: { en: "Delivered back", hi: "घर पर डिलीवरी" }, text: { en: "Your finished blouse or petticoat comes back to your door.", hi: "तैयार ब्लाउज़/पेटीकोट आपके घर वापस पहुँचाया जाता है।" } }
    ]
  },

  // Services cards
  services: [
    { icon: "👚", title: { en: "Blouse Stitching", hi: "ब्लाउज़ सिलाई" }, text: { en: "Princess cut, boat neck, back designs, padded, collar & sleeve patterns.", hi: "प्रिंसेस कट, बोट नेक, बैक डिज़ाइन, पैडेड, कॉलर और स्लीव पैटर्न।" }, price: { en: "From ₹150*", hi: "₹150* से शुरू" } },
    { icon: "🩱", title: { en: "Petticoat Stitching", hi: "पेटीकोट सिलाई" }, text: { en: "Cotton & satin petticoats, A-line and fish-cut with comfortable fitting.", hi: "कॉटन और साटन पेटीकोट, A-लाइन और फिश-कट, आरामदायक फिटिंग।" }, price: { en: "From ₹150*", hi: "₹150* से शुरू" } },
    { icon: "🧵", title: { en: "Alteration & Fall-Pico", hi: "अल्टरेशन और फॉल-पिको" }, text: { en: "Size changes, repairs, saree fall and pico finishing.", hi: "साइज़ बदलना, मरम्मत, साड़ी फॉल और पिको।" }, price: { en: "Only ₹50", hi: "सिर्फ़ ₹50" } },
    { icon: "👰", title: { en: "Bridal & Festive", hi: "दुल्हन और त्योहार" }, text: { en: "Heavy work, lace, piping and potli-button designs for weddings and festivals.", hi: "शादी और त्योहार के लिए भारी वर्क, लेस, पाइपिंग और पोटली बटन डिज़ाइन।" }, price: { en: "Ask for quote", hi: "कोटेशन पूछें" } }
  ],

  // Design gallery. cat: blouse | petticoat | bridal
  // To use a real photo add:  image: "images/my-photo.jpg"   (put the file in the images folder)
  designs: [
    { id: "d1", cat: "blouse", c: ["#8b1e3f", "#e8a0b4"], neck: "v", name: { en: "Princess Cut Blouse", hi: "प्रिंसेस कट ब्लाउज़" } },
    { id: "d2", cat: "blouse", c: ["#1f6f5c", "#9fd8c4"], neck: "boat", name: { en: "Boat Neck Blouse", hi: "बोट नेक ब्लाउज़" } },
    { id: "d3", cat: "blouse", c: ["#6b2a8a", "#d3a6ea"], neck: "back", name: { en: "Deep Back Design", hi: "डीप बैक डिज़ाइन" } },
    { id: "d4", cat: "blouse", c: ["#c2571a", "#f5c28a"], neck: "round", name: { en: "Padded Blouse", hi: "पैडेड ब्लाउज़" } },
    { id: "d5", cat: "petticoat", c: ["#d46a8a", "#f7d4de"], neck: "pet", name: { en: "Cotton Petticoat", hi: "कॉटन पेटीकोट" } },
    { id: "d6", cat: "petticoat", c: ["#2a4d9b", "#a9c1f0"], neck: "pet", name: { en: "Satin A-line Petticoat", hi: "साटन A-लाइन पेटीकोट" } },
    { id: "d7", cat: "petticoat", c: ["#7a3b1d", "#e5b999"], neck: "fish", name: { en: "Fish-cut Petticoat", hi: "फिश-कट पेटीकोट" } },
    { id: "d8", cat: "bridal", c: ["#a3112d", "#f0c14b"], neck: "bridal", name: { en: "Bridal Heavy Blouse", hi: "दुल्हन भारी ब्लाउज़" } },
    { id: "d9", cat: "bridal", c: ["#8b1e3f", "#f0c14b"], neck: "back", name: { en: "Potli Button Back", hi: "पोटली बटन बैक" } },
    { id: "d10", cat: "blouse", c: ["#2d2d6b", "#b7b7f0"], neck: "collar", name: { en: "Collar Neck Blouse", hi: "कॉलर नेक ब्लाउज़" } },
    { id: "d11", cat: "petticoat", c: ["#12766e", "#c7ece7"], neck: "lace", name: { en: "Lace Border Petticoat", hi: "लेस बॉर्डर पेटीकोट" } },
    { id: "d12", cat: "bridal", c: ["#b5651d", "#ffe08a"], neck: "bridal", name: { en: "Festive Zari Blouse", hi: "त्योहार ज़री ब्लाउज़" } }
  ],

  // Customer reviews. Customers send reviews through the form; when you approve one,
  // copy a block below. These three are SAMPLES - replace/delete them with real ones.
  reviews: [
    { name: "Sunita, Jhusi", rating: 5, text: { en: "Perfect blouse fitting, and delivered on time!", hi: "ब्लाउज़ की फिटिंग एकदम परफेक्ट थी, समय पर मिल गया!" } },
    { name: "Priya, Prayagraj", rating: 5, text: { en: "Beautiful back design, everyone asked where I got it stitched.", hi: "बैक डिज़ाइन बहुत सुंदर, सबने पूछा कहाँ सिलवाया।" } },
    { name: "Anita, Allahabad", rating: 5, text: { en: "Got a heavy blouse made for a wedding — came out gorgeous.", hi: "शादी के लिए भारी ब्लाउज़ बनवाया, बहुत सुंदर बना।" } }
  ],
  reviewsAreSamples: true,   // set to false once you have added real reviews

  // Frequently asked questions (also good for Google search)
  faqs: [
    { q: { en: "Where is the best ladies blouse tailor near Chamanganj Bazar, Jhusi, Prayagraj?", hi: "चमनगंज बाज़ार, झूँसी, प्रयागराज के पास सबसे अच्छा लेडीज़ टेलर कहाँ है?" }, a: { en: "Jhusi Silai Centre is located near Chamanganj Bazar, Jhusi, Prayagraj. We stitch ladies blouses and petticoats with perfect fitting and 2-day delivery on regular designs.", hi: "झूँसी सिलाई सेंटर चमनगंज बाज़ार, झूँसी, प्रयागराज के पास है। हम परफेक्ट फिटिंग के साथ लेडीज़ ब्लाउज़ और पेटीकोट सिलाई करते हैं; साधारण डिज़ाइन 2 दिन में तैयार।" } },
    { q: { en: "Do you serve customers from Chamanganj Bazar area?", hi: "क्या आप चमनगंज बाज़ार इलाके के ग्राहकों को सेवा देते हैं?" }, a: { en: "Yes! We are located near Chamanganj Bazar, Jhusi and serve all nearby areas including Jhusi, Arail, Phaphamau, Naini, Civil Lines and all of Prayagraj.", hi: "हाँ! हम चमनगंज बाज़ार, झूँसी के पास हैं और झूँसी, अराइल, फाफामऊ, नैनी, सिविल लाइंस और पूरे प्रयागराज के ग्राहकों को सेवा देते हैं।" } },
    { q: { en: "How fast can I get my blouse stitched in Jhusi?", hi: "झूँसी में ब्लाउज़ कितनी जल्दी सिल जाता है?" }, a: { en: "Regular blouses and petticoats are ready in 2 days. Heavy, bridal or festive work takes longer — ask for a date.", hi: "साधारण ब्लाउज़ और पेटीकोट 2 दिन में तैयार। भारी/दुल्हन/त्योहार वर्क में ज़्यादा समय — तारीख़ पूछें।" } },
    { q: { en: "Do you offer home pickup from Chamanganj Bazar, Jhusi?", hi: "क्या आप चमनगंज बाज़ार, झूँसी से घर पर पिकअप करते हैं?" }, a: { en: "Yes, home pickup is optional. Choose 'Pickup & drop at my home' in the contact form and share your location. It adds an extra charge, and payment is taken first.", hi: "हाँ, घर से पिकअप वैकल्पिक है। संपर्क फ़ॉर्म में 'घर से पिकअप और ड्रॉप' चुनें और लोकेशन भेजें। इससे अतिरिक्त शुल्क जुड़ता है और पेमेंट पहले लिया जाता है।" } },
    { q: { en: "What is the minimum blouse stitching charge in Jhusi, Prayagraj?", hi: "झूँसी, प्रयागराज में ब्लाउज़ सिलाई का न्यूनतम चार्ज क्या है?" }, a: { en: "Blouse and petticoat stitching starts from ₹150. Alteration and fall-pico is only ₹50. Bridal and heavy-work blouses are quoted separately.", hi: "ब्लाउज़ और पेटीकोट सिलाई ₹150 से शुरू। अल्टरेशन और फॉल-पिको सिर्फ़ ₹50। दुल्हन और भारी वर्क का कोटेशन अलग से।" } },
    { q: { en: "What if the fitting is not right?", hi: "अगर फिटिंग सही न हो तो?" }, a: { en: "Tell us within 7 days and we will correct the fitting free of charge. Alteration and fall-pico are only ₹50.", hi: "7 दिन के अंदर बताइए, हम फिटिंग निःशुल्क ठीक करेंगे। अल्टरेशन और फॉल-पिको सिर्फ़ ₹50।" } }
  ],

  // Areas served (shown as chips; helps local search)
  areas: ["Chamanganj Bazar, Jhusi", "Jhusi", "Prayagraj (Allahabad)", "Arail", "Phaphamau", "Naini", "Civil Lines", "Jhunsi Chhatnag", "Sangam Area", "Lukerganj", "Daraganj"]
};
