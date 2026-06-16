// ── FRAME SYSTEM ─────────────────────────────────────────────────────────────
const FRAME_NAMES  = ['','Essentials','Lies','Non-Essentials','Wisdom','Unclean'];
const FRAME_COLORS = ['','#0B3D91','#1F4D2F','#D4A574','#D4A574','#A0523D'];
const FRAME_ICONS  = ['','bolt','close','≈','balance','warning'];
const FRAME_BG     = ['','rgba(11,61,145,0.1)','rgba(11,61,145,0.1)','rgba(212,165,116,0.1)','rgba(212,165,116,0.1)','rgba(160,82,61,0.1)'];
const FRAME_FILL   = ['',true,false,false,false,true];
const FRAME_DESCS  = ['',
  'I agree, and it\'s central. To be wrong here is to know a different God.',
  'I disagree, and it must be named. This misrepresents who God is.',
  'I lean, but hold it loosely. Faithful Christians land differently; grace fits.',
  'It depends. The right answer shifts with people, season, and situation.',
  'Neither yes nor no is safe. The question itself is malformed and must be reframed.'
];

// ── GENERAL STATEMENTS POOL ──────────────────────────────────────────────────
const GENERAL_STATEMENTS = [
  { text:"Jesus Christ is the only way of salvation — not one of many paths to God.", topic:"Salvation", correct:1, community:[72,7,5,8,8] },
  { text:"The bodily resurrection of Jesus was physical and historical — not symbolic or spiritual.", topic:"Resurrection", correct:1, community:[81,4,4,7,4] },
  { text:"Scripture is the sufficient and final authority for Christian doctrine and life.", topic:"Scripture", correct:1, community:[69,5,7,12,7] },
  { text:"Jesus never claimed to be God — that claim was developed by His followers after His death.", topic:"Christology", correct:2, community:[3,83,2,4,8] },
  { text:"God promises financial prosperity and physical health to all who have genuine faith.", topic:"Prosperity Gospel", correct:2, community:[4,73,3,6,14] },
  { text:"Baptism by full immersion is the only valid form of Christian baptism.", topic:"Sacraments", correct:3, community:[16,4,52,18,10] },
  { text:"Christians who struggle with ongoing mental illness simply lack sufficient faith in God.", topic:"Faith & Suffering", correct:2, community:[3,66,5,6,20] },
  { text:"Christians should observe some regular form of sabbath rest, though the specific day is secondary.", topic:"Sabbath", correct:4, community:[12,8,20,46,14] },
  { text:"God only heals those whose faith is strong enough — illness is always a sign of spiritual weakness.", topic:"Healing", correct:5, community:[5,35,4,10,46] },
  { text:"The Holy Spirit, the Father, and the Son are three modes of the same person — not three persons.", topic:"Trinity", correct:2, community:[7,63,6,8,16] },
];

// ── MODULES ──────────────────────────────────────────────────────────────────
const MODULES = {
  'built-different': {
    id: 'built-different',
    title: "I'm Built Different",
    series: 'Union Church',
    community: 'Union Church',
    date: 'Jun 14, 2026',
    type: 'Theology',
    duration: '34 min',
    scripture: 'Matthew 7:24–27',
    videoId: '-S-t7QdMGNE',

    preSortStatements: [
      { text:"True wisdom is not just knowing God's Word — it is putting it into practice.", topic:"Discipleship", correct:1, community:[80,3,5,8,4] },
      { text:"The most important parts of what you are building are the parts that people cannot see.", topic:"Foundation", correct:1, community:[68,3,10,14,5] },
      { text:"A believer can genuinely agree with what God says and still never align their life to actually reflect it.", topic:"Obedience", correct:1, community:[73,5,7,10,5] },
      { text:"Obedience to God's Word exempts a faithful believer from life's storms.", topic:"Trials", correct:2, community:[5,70,4,12,9] },
      { text:"If someone is going through a painful storm, it is most likely because of sin or spiritual failure in their life.", topic:"Suffering", correct:2, community:[4,55,5,26,10] },
      { text:"The specific spiritual disciplines a believer practices — daily devotionals vs. weekly study, liturgical prayer vs. spontaneous — is a matter of personal tradition and preference.", topic:"Spiritual Practices", correct:3, community:[10,6,48,30,6] },
      { text:"A storm in your life can sometimes be a gift from God, revealing cracks in your foundation while you are still at a level where they can be repaired.", topic:"Trials", correct:4, community:[20,8,5,57,10] },
      { text:"Visible success is a reliable indicator that a person has built their life on the right foundation.", topic:"Foundation", correct:5, community:[6,44,4,15,31] },
    ],

    arguments: [
      { text:'"The support beams had to be drilled deep so that the building could be built tall."', timestamp:'3:29' },
      { text:'"Height without depth is a disaster waiting to happen."', timestamp:'6:54' },
      { text:'"You can never trust the construction when you already ignore the instruction."', timestamp:'10:57' },
      { text:'"Don\'t just agree with the Word — align with it."', timestamp:'16:54' },
      { text:'"Storms don\'t create foundations — they expose them."', timestamp:'24:07' },
      { text:'"The storm of suffering asks: can your trust survive your disappointment?"', timestamp:'28:04' },
      { text:'"The storm of temptation asks: who do you become when your flesh is weak?"', timestamp:'29:33' },
      { text:'"The storm of pressure asks: can your faith survive the weight?"', timestamp:'30:44' },
    ],

    sortStatements: [
      { text:'"You can\'t build it tall until you\'ve first built it deep."', topic:"Foundation", correct:1, community:[76,3,4,12,5] },
      { text:'"Height without depth is a disaster waiting to happen."', topic:"Foundation", correct:1, community:[77,3,4,11,5] },
      { text:'"You cannot trust the construction when you have ignored the instructions."', topic:"Obedience", correct:1, community:[74,3,5,13,5] },
      { text:'"Don\'t just agree with God\'s Word — align your life with it."', topic:"Discipleship", correct:1, community:[81,3,3,9,4] },
      { text:'"Storms don\'t create weak foundations — they expose them."', topic:"Trials", correct:1, community:[76,3,4,12,5] },
      { text:'"The storm of suffering reveals whether your trust can survive unmet expectations."', topic:"Suffering", correct:1, community:[70,4,5,16,5] },
      { text:'"The storm of temptation reveals who you become when your flesh is at its weakest."', topic:"Temptation", correct:1, community:[72,3,4,16,5] },
      { text:'"The storm of pressure reveals whether your faith can survive carrying weight for too long."', topic:"Pressure", correct:4, community:[22,4,5,60,9] },
    ],

    formation: [
      {
        title: "Excavation Before Elevation",
        icon: "anchor",
        scripture: "Ephesians 3:17–19",
        verseText: "…that Christ may dwell in your hearts through faith — that you, being rooted and grounded in love, may have strength to comprehend with all the saints what is the breadth and length and height and depth, and to know the love of Christ that surpasses knowledge, that you may be filled with all the fullness of God.",
        body: "In 2014, engineers drilling the foundation for One World Trade Center sent steel beams 150 feet into Manhattan bedrock before a single visible floor was added. No ribbon-cutting. No ceremony. Just invisible work that would make everything visible possible. Jesus understood this principle long before architects did. In Matthew 7, He doesn't describe two builders with different blueprints — they both build, they both face storms. The only difference is what they built on. This is the paradox of spiritual formation: the most important work you will ever do is the work no one will ever see. Your prayer life before sunrise, your Scripture study in private, your repentance when no one's watching, your surrender in secret — these are not preparation for the real work. They are the real work. Ephesians 3:17–19 prays that believers would be 'rooted and grounded' before they are fully grasped. Paul's order is deliberate: the root comes before the grasp. Everything else is just the part people can see. The question isn't 'Will I build?' — it's 'Am I willing to dig?'"
      },
      {
        title: "Agreement vs. Alignment",
        icon: "auto_stories",
        scripture: "James 1:22–25",
        verseText: "But be doers of the word, and not hearers only, deceiving yourselves. For if anyone is a hearer of the word and not a doer, he is like a man who looks intently at his natural face in a mirror. For he looks at himself and goes away and at once forgets what he was like. But the one who looks into the perfect law, the law of liberty, and perseveres, being no hearer who forgets but a doer who acts, he will be blessed in his doing.",
        body: "Dallas Willard observed in The Divine Conspiracy that modern Christianity has collapsed discipleship into either believing the right thing or doing the right thing, when the goal is actually becoming — having belief and behavior fuse into who you are. Pastor Hollis draws the same line with sharper language: it is entirely possible to agree with what God says and never align your life to reflect it. Agreement happens in a moment. Alignment happens over a lifetime. You can agree that prayer matters without praying. You can agree that forgiveness is required without forgiving. You can shout over a sermon you never plan to submit to. James 1:22 calls this self-deception: being a hearer only, looking at your face in a mirror and immediately forgetting what you saw. The alignment test is concrete: does your calendar, your closest relationships, and what you do with your money look like the life of someone who is actually submitting to God's Word? Your agreement can't answer that. Only your alignment can."
      },
      {
        title: "Storms Reveal, They Don't Create",
        icon: "shield",
        scripture: "Romans 5:3–5",
        verseText: "Not only that, but we rejoice in our sufferings, knowing that suffering produces endurance, and endurance produces character, and character produces hope, and hope does not put us to shame, because God's love has been poured into our hearts through the Holy Spirit who has been given to us.",
        body: "One of the sermon's most disorienting claims is that both builders faced the same storm. Obedience did not exempt the wise builder from rain, rising streams, and wind — it only determined whether the house stood. This completely reframes what a storm is for. If obedience doesn't prevent the storm, then the storm is not a verdict on your behavior. It is a diagnostic on your foundation. Storms expose what was already true: cracks you didn't know existed, structures you assumed were solid, depth that hadn't been tested. Romans 5 goes further — Paul says we rejoice in our sufferings because suffering produces perseverance, perseverance produces character, and character produces hope. The storm isn't undoing you. It is forming you — but only if you built on the rock. The wise builder doesn't dread the storm because the storm only confirms what was already true before it arrived. The question to bring into every storm is not 'Why is this happening to me?' but 'What is this revealing in me?'"
      },
      {
        title: "Three Storms That Test Your Foundation",
        icon: "psychology",
        scripture: "1 Peter 1:6–7",
        verseText: "In this you rejoice, though now for a little while, if necessary, you have been grieved by various trials, so that the tested genuineness of your faith — more precious than gold that perishes though it is tested by fire — may be found to result in praise and glory and honor at the revelation of Jesus Christ.",
        body: "Pastor Hollis names three storms that expose a believer's foundation. The storm of suffering asks whether your trust can survive your disappointment — whether unmet expectations will make you walk away from God entirely. The storm of temptation asks who you become when your flesh is weak. He catalogs the great figures of faith: David ran to murder, Samson to Delilah, Abraham to deception, Noah to a bottle, Elijah to suicidal despair. None were storm-exempt. Where you run when your flesh is failing reveals what you are actually built on. The storm of pressure asks whether your faith can survive the weight — not just its heaviness, but its duration. First Peter 1:7 says these trials prove the genuineness of your faith, 'of greater worth than gold, which perishes even though refined by fire.' The storm is not the interruption of your story. In the hands of a wise builder who has dug deep, the storm becomes the proof. The house stood. And everyone knew it."
      }
    ],

    assessment: [
      {
        q:"According to the sermon, what made the wise builder different from the foolish builder?",
        options:[
          "The wise builder chose a safer location for his house",
          "The wise builder had greater natural ability and resources",
          "The wise builder heard the Word and put it into practice",
          "The wise builder prayed harder before the storm arrived"
        ],
        correct:2,
        explanation:"Jesus makes clear in Matthew 7:24 that both builders heard the Word — the difference was not exposure but response. The wise builder 'put it into practice.' The sermon's entire argument flows from this: the distinction is not between those who hear and those who don't, but between those who obey and those who don't."
      },
      {
        q:"What does the sermon mean by 'obsessed with elevation while ignoring excavation'?",
        options:[
          "Christians focus too much on praise and worship and not enough on theology",
          "We celebrate visible results while neglecting the invisible foundation that makes them possible",
          "Church buildings are being built for appearance rather than function",
          "People pursue career advancement while ignoring spiritual practices"
        ],
        correct:1,
        explanation:"The sermon uses the One World Trade Center metaphor to argue that most people celebrate the height of a building while ignoring the 150 feet of support beams beneath it. Spiritually, this means we prize visible success, influence, and growth while neglecting the invisible disciplines — prayer, obedience, character formation — that make any of it sustainable."
      },
      {
        q:"A believer who affirms that God calls them to forgive others, shouts 'Amen' when the pastor preaches it, but has never actually forgiven anyone who hurt them — best illustrates which problem from the sermon?",
        options:[
          "The storm of suffering",
          "Confusing visibility with value",
          "The gap between agreement and alignment",
          "Height without depth"
        ],
        correct:2,
        explanation:"The sermon's sharpest diagnostic is the gap between agreement and alignment. You can agree with God's Word — affirm it, celebrate it, shout over it — without ever aligning your life to reflect it. Dallas Willard's insight from The Divine Conspiracy is cited directly: Christianity is meant to be believing and doing that leads to becoming. Agreement that never becomes alignment is self-deception."
      },
      {
        q:"According to the sermon, what is the primary purpose of a storm in the life of a believer?",
        options:[
          "To punish sin and motivate repentance",
          "To remove people from positions God hasn't assigned them",
          "To reveal the strength or weakness of the foundation already in place",
          "To give believers an opportunity to demonstrate their faith publicly"
        ],
        correct:2,
        explanation:"The sermon is explicit: 'Storms don't create foundations — they expose them.' Both the wise and foolish builder faced the same storm. The storm did not produce the outcome — it revealed it. The wise builder's house stood not because the storm was different, but because the foundation was. The storm's function is diagnostic, not punitive."
      },
      {
        q:"The sermon says obedience to God's Word does not make you storm-exempt, but makes you storm-proof. What is the key difference?",
        options:[
          "Storm-exempt means no storms; storm-proof means you enjoy the storms",
          "Storm-exempt means God removes all hardship; storm-proof means you stand through hardship because of what you're built on",
          "Storm-exempt applies to physical storms; storm-proof applies to spiritual ones",
          "There is no meaningful difference — both describe the same outcome"
        ],
        correct:1,
        explanation:"Both builders in Matthew 7 experienced the same storm — rain, rising streams, wind. Obedience removed none of it. What obedience provided was a foundation strong enough to stand when the storm hit. Storm-proof doesn't mean no storm; it means the storm cannot bring down what was built on the rock. The wise builder's house 'did not fall' — not because the storm was gentle, but because the foundation held."
      }
    ]
  },

  egypt: {
    id: 'egypt',
    title: "You Can't Bring Egypt With You",
    series: 'Formation Series',
    community: 'Union Church',
    date: 'Jun 7, 2026',
    type: 'Formation',
    duration: '28 min',
    scripture: 'Numbers 13:26–33',
    videoId: '_wSqePjcVf0?si=ttdAl97VpO1oZiTr',

    preSortStatements: [
      { text:"God does not waste wilderness seasons — the pain, waiting, and testing are purposeful formation, not pointless suffering.", topic:"Formation", correct:1, community:[71,4,4,14,7] },
      { text:"A person can be physically free from a painful season while still mentally enslaved to it.", topic:"Identity & Mindset", correct:1, community:[78,4,4,9,5] },
      { text:"What kept Israel from the Promised Land was not the giants — it was Israel's fear of the giants.", topic:"Numbers 13", correct:1, community:[76,4,3,10,7] },
      { text:"Not one word of all of God's good promises has ever failed.", topic:"God's Faithfulness", correct:1, community:[82,3,3,7,5] },
      { text:"New seasons from God always feel peaceful and free of fear — if something feels scary, it probably isn't from Him.", topic:"Discernment", correct:5, community:[6,23,5,14,52] },
      { text:"Returning to a familiar situation after God has called you forward always means you have failed in faith.", topic:"Discernment", correct:5, community:[8,22,7,20,43] },
      { text:"What others have named you — failure, grasshopper, slave — is more accurate than what God says about you.", topic:"Identity", correct:2, community:[3,73,4,6,14] },
      { text:"If God has not fulfilled His promise to you yet, He has probably moved on to someone more faithful.", topic:"God's Faithfulness", correct:2, community:[2,78,3,5,12] },
    ],

    arguments: [
      { text:'"Wilderness seasons are God\'s classroom, not His punishment."', timestamp:'2:36' },
      { text:'"You cannot carry Egypt\'s mindsets into the Promised Land."', timestamp:'7:55' },
      { text:'"Israel named themselves \'grasshoppers\' before the giants did."', timestamp:'12:25' },
      { text:'"God\'s promises are not canceled by delay — not a word has failed."', timestamp:'20:40' },
    ],

    sortStatements: [
      { text:'"Wilderness seasons are God\'s classroom, not His punishment."', topic:"Formation", correct:1, community:[74,4,4,12,6] },
      { text:'"You cannot carry Egypt\'s mindsets into the Promised Land."', topic:"Formation", correct:1, community:[79,3,4,9,5] },
      { text:'"Israel named themselves \'grasshoppers\' before the giants did."', topic:"Identity", correct:1, community:[81,3,3,8,5] },
      { text:'"God\'s promises are not canceled by delay — not a word has failed."', topic:"God\'s Faithfulness", correct:1, community:[85,3,3,6,3] },
    ],

    formation: [
      {
        title:"The Wilderness Is Curriculum",
        icon:"school",
        scripture:"Deuteronomy 8:2",
        verseText: "And you shall remember the whole way that the LORD your God has led you these forty years in the wilderness, that he might humble you, testing you to know what was in your heart, whether you would keep his commandments or not.",
        body:"Moses tells Israel that God led them through the wilderness to humble and test them — to reveal what was in their hearts. The wilderness was never a detour from God's plan. It was the plan. God uses seasons of discomfort, waiting, and uncertainty to develop the internal character required to steward external promise. The question is not \"when will this be over?\" but \"God, what are You forming in me?\""
      },
      {
        title:"Egypt Is a Mindset, Not Just a Place",
        icon:"psychology",
        scripture:"Numbers 13:33",
        verseText: "And there we saw the Nephilim (the sons of Anak, who come from the Nephilim), and we seemed to ourselves like grasshoppers, and so we seemed to them.",
        body:"When Israel said \"we seemed like grasshoppers in our own eyes,\" they weren't describing the giants — they were describing themselves through the lens of 400 years of slavery. Egypt had named them. The chains were broken, but the identity hadn't been. God's deliverance changes your location. Only His formation changes your self-perception. You can leave an old season while still carrying the mindset of it."
      },
      {
        title:"The Grasshopper Problem",
        icon:"person",
        scripture:"Numbers 13:33",
        verseText: "And there we saw the Nephilim (the sons of Anak, who come from the Nephilim), and we seemed to ourselves like grasshoppers, and so we seemed to them.",
        body:"The spies called themselves grasshoppers before the Canaanites did. They preemptively disqualified themselves using a slave identity that no longer applied. This is the grasshopper problem: allowing a past label — failure, inadequate, unworthy, too broken — to define your present capacity. God had already said something different about them. The question every believer must answer is whose word they will believe about themselves."
      },
      {
        title:"God's Promises Don't Expire",
        icon:"verified",
        scripture:"Joshua 21:45",
        verseText: "Not one word of all the good promises that the LORD had made to the house of Israel had failed; all came to pass.",
        body:"Joshua 21:45 declares that not one word of all the good promises God made to Israel failed — every one of them came true. The first generation didn't make it in, but the promise wasn't canceled. God's delay is not God's denial. He is not removing the promise; He is forming the person worthy of possessing it. Hebrews 10:35–36 says perseverance is needed to receive what God has promised. Don't throw away your confidence — it has great reward."
      }
    ],

    assessment: [
      {
        q:"A wilderness season that feels painful and disorienting is most likely...",
        options:[
          "God's punishment for a past failure",
          "God's formation of who you need to become",
          "A sign to return to what's familiar",
          "Evidence that God's promise has been canceled"
        ],
        correct:1,
        explanation:"This sermon's central argument is that God uses the wilderness purposefully — to form you, not punish you. Deuteronomy 8:2 confirms God led Israel through the wilderness to humble and test them, to develop what was in their hearts."
      },
      {
        q:"When the sermon says 'you can't bring Egypt with you,' it primarily means...",
        options:[
          "You must leave your hometown to follow God",
          "Physical separation from sin is always sufficient for spiritual freedom",
          "You must let God transform old mindsets even after circumstances change",
          "Israel should have stayed in Egypt longer before the Exodus"
        ],
        correct:2,
        explanation:"Egypt here represents a mindset shaped by bondage — fear, slave identity, and self-diminishment. Israel left Egypt geographically but carried Egypt psychologically. God's goal is to reform our internal identity, not just our external location."
      },
      {
        q:"Joshua 21:45 declares 'not one of all the LORD's good promises to Israel failed.' This most directly refutes which claim?",
        options:[
          "Wilderness seasons are God's classroom, not His punishment",
          "Israel should have trusted God rather than the fearful spies",
          "If God hasn't fulfilled His promise to you yet, He has probably moved on",
          "The Promised Land wasn't worth the wilderness journey"
        ],
        correct:2,
        explanation:"Joshua 21:45 is the sermon's answer to the lie that God's delay means God's denial. Every promise was fulfilled in the end. God's timetable is not evidence of abandonment — perseverance is the appropriate response to a promise that feels delayed."
      },
      {
        q:"When Israel said 'we seemed like grasshoppers in our own eyes' (Numbers 13:33), the sermon identifies this as...",
        options:[
          "A humble and wise military assessment",
          "A spiritual gift of caution that God honored",
          "Self-identification with a slave identity before any enemy spoke over them",
          "An appropriate emotional response to overwhelming obstacles"
        ],
        correct:2,
        explanation:"The spies called themselves grasshoppers before the Canaanites did. This is the grasshopper problem — applying a past identity (slave, inferior) to a present that God had already redefined. It was the language of Egypt spoken on the border of the Promise."
      },
      {
        q:"Which statement best reflects this sermon's core teaching?",
        options:[
          "God primarily uses seasons of comfort and ease to mature His people",
          "People shaped by decades of painful pasts cannot become who God's promises require",
          "If a new season feels scary, it is probably not from God",
          "God's delay does not mean God's denial — He is forming someone worthy of the promise"
        ],
        correct:3,
        explanation:"The entire sermon argues that the wilderness — painful, uncertain, disorienting — is precisely where God does His deepest formation work. Discomfort is not disqualifying; it is developmental. And God's faithfulness is not measured by speed of fulfillment but by the certainty of His word."
      }
    ]
  },

  // ── REMNANT CHRISTIAN NETWORK ─────────────────────────────────────────────

  'how-to-seek-god': {
    id: 'how-to-seek-god',
    title: "How to Seek God",
    series: 'RCN Teaching Series',
    community: 'The Remnant Christian Network',
    date: 'RCN Archives',
    type: 'Formation',
    duration: '55 min',
    scripture: 'Jeremiah 29:13',
    videoId: 'LReHMIpivBw',

    preSortStatements: [
      { text:"Seeking God is primarily about mastering the right spiritual disciplines in the correct order.", topic:"Spiritual Formation", correct:2, community:[14,52,6,18,10] },
      { text:"You can have genuine love for God without necessarily developing knowledge of how He operates in the spiritual realm.", topic:"Spiritual Knowledge", correct:2, community:[12,55,8,18,7] },
      { text:"Prayer is most effective when a believer clearly articulates their needs and petitions to God.", topic:"Prayer", correct:4, community:[30,5,6,52,7] },
      { text:"True saving faith anchors you to what God has said regardless of what your circumstances appear to communicate.", topic:"Faith", correct:1, community:[76,3,4,12,5] },
      { text:"A person who does not feel ready for a calling is most likely not called to it.", topic:"Preparation", correct:2, community:[8,60,6,18,8] },
      { text:"Personal consecration and holiness determine the depth of a believer's access to God.", topic:"Consecration", correct:1, community:[72,4,5,14,5] },
      { text:"Seeking God will always produce the same predictable emotional experience — peace, warmth, or a felt sense of His presence.", topic:"Seeking God", correct:5, community:[10,22,7,15,46] },
      { text:"A believer who hungers for God more than they hunger for results will always find Him.", topic:"Seeking God", correct:1, community:[78,3,4,10,5] },
    ],

    arguments: [
      { text:'"Seeking God has no regimented pattern — it is, first and fundamentally, a matter of your quest for God."', timestamp:'7:20' },
      { text:'"You cannot sustain a real relationship with what you have no knowledge of. Spiritual knowledge is not optional — it is the prerequisite to genuine encounter."', timestamp:'15:45' },
      { text:'"Prayer is not informing God of what He doesn\'t know. Prayer is the believer cooperating with heaven to actualize what God has already purposed on earth."', timestamp:'24:30' },
      { text:'"Sovereign faith is becoming scarce in our generation — a faith that holds its ground when what you see contradicts what you believe."', timestamp:'33:10' },
      { text:'"Every man God used significantly was processed in obscurity before he was displayed in impact. The season of hiddenness is not punishment — it is sacred investment."', timestamp:'41:55' },
      { text:'"To seek God authentically is to reckon that without Him you are undone. That reckoning is not weakness — it is the beginning of wisdom."', timestamp:'49:40' },
    ],

    sortStatements: [
      { text:'"Seeking God is not a technique or formula — it is a sustained desire that fundamentally transforms who you are."', topic:"Spiritual Formation", correct:1, community:[76,3,4,12,5] },
      { text:'"A believer cannot truly walk with God without cultivating knowledge and understanding of the spiritual realm."', topic:"Spiritual Knowledge", correct:1, community:[70,4,5,14,7] },
      { text:'"Prayer is primarily about partnering with God\'s purposes on earth, not asking God to partner with ours."', topic:"Prayer", correct:1, community:[74,3,4,14,5] },
      { text:'"Sovereign faith is the kind of faith that holds its convictions regardless of what circumstances appear to communicate."', topic:"Faith", correct:1, community:[79,3,4,10,4] },
      { text:'"God deliberately prepares believers in seasons of obscurity before elevating them to public impact."', topic:"Preparation", correct:4, community:[48,5,7,32,8] },
      { text:'"The acknowledgment of complete dependence on God is the foundational posture of genuine seeking."', topic:"Consecration", correct:1, community:[76,3,4,12,5] },
    ],

    formation: [
      {
        title: "Seeking Is a Posture, Not a Pattern",
        icon: "search",
        scripture: "Jeremiah 29:13",
        verseText: "You will seek me and find me when you seek me with all your heart.",
        body: "One of the most damaging ideas in contemporary Christianity is that seeking God follows a predictable formula — pray these words, follow these steps, feel these feelings, and God will show up. Apostle Arome dismantles this from the first moment of the teaching. Seeking God has no regimented pattern because it is fundamentally not a technique — it is a quest. And a quest is driven not by method but by hunger. Jeremiah 29:13 does not describe a procedure. It describes a posture: 'when you seek me with all your heart.' The modifier is not 'when you seek me correctly' — it is 'with all your heart.' What God is looking for is not the sophistication of your spiritual discipline. It is the wholeness of your desire. The difference between the one who finds God and the one who goes through the motions of seeking Him is not their prayer format — it is how badly they actually want Him. This reframes the question from 'Am I doing this right?' to 'Is my hunger real?'"
      },
      {
        title: "Spiritual Knowledge Is Not Optional",
        icon: "school",
        scripture: "Hosea 4:6",
        verseText: "My people are destroyed from lack of knowledge. Because you have rejected knowledge, I also reject you as my priests; because you have ignored the law of your God, I also will ignore your children.",
        body: "Apostle Arome makes a point that surprises many: you cannot maintain a real relationship with someone you have no knowledge of. This is obvious in the natural — no one builds a genuine friendship through complete ignorance of the other person. But in Christianity, we have concluded that love for God and knowledge of how God operates are separable. Arome argues they are not. You can feel warmth toward God in a worship service and still be entirely ignorant of how He moves, how the spiritual realm operates, how prayer functions in the heavenly order. That ignorance does not disqualify your love, but it does limit your relationship. Hosea 4:6 is blunt: 'My people are destroyed for lack of knowledge.' The destruction is not from lack of sincerity. The people were sincere. They were destroyed because sincerity without knowledge cannot navigate a world where invisible forces have visible consequences. Seeking God, then, includes seeking to understand Him — not just feeling His presence but knowing His ways."
      },
      {
        title: "Prayer as Heaven-Earth Partnership",
        icon: "sync_alt",
        scripture: "Matthew 6:10",
        verseText: "Your kingdom come, your will be done, on earth as it is in heaven.",
        body: "How a believer understands prayer determines everything about how they pray — and how disappointed they get when prayer seems not to work. Apostle Arome offers a reframe that changes the entire orientation: prayer is not primarily about asking God to respond to your situation. Prayer is the mechanism by which what is already true in heaven is brought to expression on earth. Matthew 6:10 is not primarily a petition — it is a declaration of cooperation. 'Your kingdom come, your will be done, on earth as it is in heaven.' The believer who prays is not initiating something God was waiting to be convinced of. The believer is actualizing, through prayer, what God has already decided in eternity. This is why prayer creates partnership with angelic forces — prayer is the believer saying yes to what heaven has already said yes to. It is not a negotiation with God; it is an alignment with God. And the person who has learned to seek God understands this: they are not trying to move God toward them. They are positioning themselves within God's already-moving purposes."
      },
      {
        title: "The Season of Hiddenness Is Sacred",
        icon: "timer",
        scripture: "Luke 2:52",
        verseText: "And Jesus grew in wisdom and stature, and in favor with God and man.",
        body: "Between promise and manifestation there is almost always a season that looks like nothing is happening. Apostle Arome calls this the season of hiddenness — and he is insistent: it is not wasted time. It is sacred investment. Every significant figure in Scripture went through it. Moses had forty years in the wilderness before the burning bush. David was anointed king and then spent years running from the man who sat on his throne. Jesus Himself — described in Luke 2:52 as growing in wisdom and stature — had thirty years of obscurity before three years of public ministry. The pattern is not accidental. God uses the hidden season not to delay you but to develop you. He is not building your platform in that season — He is building your character. And character, once formed, can carry what platform alone will destroy. If you are in a season where you feel unseen, overlooked, and unprepared, Apostle Arome's word is direct: stop asking 'when will this be over?' and start asking 'what is God forming in me through this?' The hiddenness is not the enemy of your destiny. It is the preparation of your destiny."
      }
    ],

    assessment: [
      {
        q: "According to the sermon, what is the most fundamental requirement for seeking God?",
        options: [
          "Following a structured prayer method consistently",
          "Having theological education before approaching God",
          "A genuine quest — a sustained hunger for God Himself above results",
          "Waiting until you are fully consecrated before entering His presence"
        ],
        correct: 2,
        explanation: "The sermon's opening argument is that seeking God has no regimented pattern — it is first and fundamentally a matter of quest. God is not evaluating the sophistication of your method; He is responding to the wholeness of your desire. Jeremiah 29:13 says 'when you seek me with all your heart' — the condition is not technique but genuine hunger."
      },
      {
        q: "Why does Apostle Arome say spiritual knowledge is not optional for the believer?",
        options: [
          "Because God rewards only those who study Scripture academically",
          "Because you cannot sustain a real relationship with someone you have no knowledge of",
          "Because knowledge of demons is required before any prayer can work",
          "Because spiritual knowledge replaces the need for emotional encounters with God"
        ],
        correct: 1,
        explanation: "The argument is relational: you cannot build a genuine relationship with anyone — including God — through complete ignorance of how they operate. Hosea 4:6 warns that God's people are destroyed for lack of knowledge. Sincerity without knowledge cannot navigate a world where invisible forces have visible consequences. Seeking God includes seeking to understand Him."
      },
      {
        q: "How does the sermon reframe what prayer actually is?",
        options: [
          "Prayer is primarily about convincing God to act on your behalf",
          "Prayer is a discipline that earns God's favor through consistency",
          "Prayer is the believer cooperating with heaven to actualize what God has already purposed on earth",
          "Prayer is most effective when it is long, detailed, and emotionally engaged"
        ],
        correct: 2,
        explanation: "Apostle Arome draws a sharp distinction: prayer is not informing or convincing God. It is the mechanism by which what is already true in heaven becomes actualized on earth. Matthew 6:10 — 'Your kingdom come, your will be done, on earth as it is in heaven' — is not a request for God to start doing something. It is the believer aligning with and releasing what God has already purposed."
      },
      {
        q: "What does 'sovereign faith' mean in the context of this sermon?",
        options: [
          "Faith that God can do anything regardless of whether He has promised it",
          "Faith that holds its convictions when circumstances contradict what you believe",
          "Faith given only to apostles and prophets in their public ministry",
          "Faith that produces visible results within a short period of time"
        ],
        correct: 1,
        explanation: "Sovereign faith is defined in the sermon as the kind of faith that will not negotiate with what it cannot see — that remains anchored to what God has said even when circumstances communicate the opposite. Apostle Arome laments that this kind of faith is becoming scarce in a generation that tends to recalibrate belief based on visible outcomes."
      },
      {
        q: "What is the purpose of the 'season of hiddenness' according to the sermon?",
        options: [
          "It is God's discipline for a believer who has disobeyed",
          "It signals that the original calling was wrong and needs to be abandoned",
          "It is God forming character before elevation — sacred investment, not wasted time",
          "It is a test to determine if the believer will seek God even in His apparent absence"
        ],
        correct: 2,
        explanation: "The sermon is clear: the season of hiddenness is not punishment — it is sacred investment. Moses, David, and Jesus Himself all passed through extended seasons of obscurity before public impact. God is not building a platform in the hidden season; He is building character. The character formed in hiddenness is what determines whether the platform, when it comes, will produce fruit or collapse under its own weight."
      }
    ]
  },

  'demonic-ranks': {
    id: 'demonic-ranks',
    title: "Demonic Ranks and How to Deal With Them",
    series: 'RCN Teaching Series',
    community: 'The Remnant Christian Network',
    date: 'RCN Archives',
    type: 'Theology',
    duration: '62 min',
    scripture: 'Ephesians 6:12',
    videoId: 'X3R-ajnmLdE',

    preSortStatements: [
      { text:"The demonic realm is organized into ranks and hierarchies specifically assigned to resist the purposes of God.", topic:"Spiritual Warfare", correct:1, community:[72,3,4,16,5] },
      { text:"A believer's struggles are primarily social and psychological — prayer matters but the real battles happen in the natural realm.", topic:"Spiritual Warfare", correct:2, community:[4,72,6,12,6] },
      { text:"Ignorance of how the enemy operates is one of the primary reasons believers live below their God-given authority.", topic:"Spiritual Warfare", correct:1, community:[75,3,4,13,5] },
      { text:"Only specially anointed leaders — apostles and prophets — are equipped to engage in serious spiritual warfare.", topic:"Spiritual Authority", correct:2, community:[5,70,6,15,4] },
      { text:"Personal consecration is a prerequisite for effective spiritual warfare — an unholy life cannot carry genuine spiritual authority.", topic:"Consecration", correct:1, community:[74,3,4,14,5] },
      { text:"Nations and territories are spiritually contested — there are demonic forces assigned to resist the gospel's advance in specific regions.", topic:"Territorial Warfare", correct:1, community:[68,4,5,17,6] },
      { text:"If a believer consistently faces spiritual difficulty, it most likely means they have committed a sin that is blocking God's blessing.", topic:"Suffering", correct:5, community:[7,28,5,10,50] },
      { text:"Spiritual warfare is mainly about speaking loudly in prayer — volume and persistence are the primary factors.", topic:"Prayer", correct:5, community:[5,30,8,12,45] },
    ],

    arguments: [
      { text:'"Our warfare is not against flesh and blood — and until you settle that conviction in your mind, you will always be fighting the wrong enemy."', timestamp:'5:15' },
      { text:'"Satan\'s kingdom is not disorganized chaos. Principalities, powers, rulers of darkness, spiritual wickedness in high places — these are ranks. This is a military structure deployed against the advancement of God\'s kingdom."', timestamp:'14:30' },
      { text:'"Two ignorances rob believers of their authority: ignorance of the enemy\'s devices, and ignorance of how to conduct spiritual warfare. Together, they produce a believer who was designed to win but lives as though they are losing."', timestamp:'23:45' },
      { text:'"We have been preaching a motivational gospel that produces comfortable Christians who have no idea they are in a war. Paul said he fought wild beasts in Ephesus — that is not poetry, that is the testimony of a man who encountered demonic resistance."', timestamp:'33:20' },
      { text:'"Nations are not casually evangelized. Every territory on this earth is supernaturally contested. You do not waltz into a city and reap the harvest without confronting what has been assigned there to resist you."', timestamp:'42:10' },
      { text:'"The believer who is not consecrated has no business going into battle. Consecration is not a spiritual luxury — it is your credential in the war."', timestamp:'51:05' },
    ],

    sortStatements: [
      { text:'"Recognizing that the primary opposition believers face is spiritual — not human — is foundational to effective Christian living."', topic:"Spiritual Warfare", correct:1, community:[74,3,4,14,5] },
      { text:'"The demonic realm is organized into strategic ranks specifically assigned to obstruct God\'s kingdom purposes."', topic:"Spiritual Warfare", correct:1, community:[70,4,4,16,6] },
      { text:'"Ignorance of Satan\'s tactics and ignorance of spiritual warfare are two of the primary causes of powerlessness in the church."', topic:"Spiritual Knowledge", correct:1, community:[73,3,5,14,5] },
      { text:'"The gospel does not advance without resistance — believers are called to active spiritual engagement, not passive spiritual comfort."', topic:"Spiritual Warfare", correct:1, community:[72,3,4,15,6] },
      { text:'"Territories and nations have demonic forces assigned to them that must be confronted in prayer before the gospel can freely advance."', topic:"Territorial Warfare", correct:1, community:[68,4,5,17,6] },
      { text:'"Personal holiness and consecration are not optional preparations for spiritual warfare — they are the prerequisite for carrying genuine spiritual authority."', topic:"Consecration", correct:1, community:[76,3,4,12,5] },
    ],

    formation: [
      {
        title: "The Organized Reality of Spiritual Opposition",
        icon: "account_tree",
        scripture: "Ephesians 6:12",
        verseText: "For our struggle is not against flesh and blood, but against the rulers, against the authorities, against the powers of this dark world and against the spiritual forces of evil in the heavenly realms.",
        body: "Ephesians 6:12 is not a metaphor and it is not mild. Paul uses four distinct terms — rulers, authorities, powers of this dark world, spiritual forces of evil in heavenly realms — and each describes a different tier in a deliberate hierarchy. Apostle Arome's central argument is that Satan's kingdom is not chaos. It is an organized military structure, purposefully arranged and strategically deployed against the expansion of God's kingdom. When a city remains resistant to the gospel, when a family carries generational destruction, when a nation seems sealed against spiritual breakthrough — the operative question is not 'Why isn't God doing something?' It is: what is assigned there, and who is equipped to deal with it? The ignorance that costs the church most is not ignorance of God's power. It is ignorance of the organized nature of the opposition. You cannot strategize against something you refuse to acknowledge. Understanding the ranks is not morbid fascination with the demonic — it is the intelligence briefing that makes prayer strategic rather than vague."
      },
      {
        title: "Two Ignorances That Disarm the Church",
        icon: "visibility_off",
        scripture: "2 Corinthians 2:11",
        verseText: "…so that Satan will not outsmart us. For we are familiar with his evil schemes.",
        body: "Apostle Arome identifies two specific ignorances that together explain most of the powerlessness in the contemporary church. The first is ignorance of the enemy's devices — the specific tactics, entry points, and strategies Satan uses to exploit vulnerability in individual believers, families, churches, and nations. 2 Corinthians 2:11 says Paul was not ignorant of Satan's schemes — implying that being ignorant of them is a choice, not an inevitability. The second is even more damaging: ignorance of how to conduct spiritual warfare. The church has been taught to celebrate what God can do, but very few believers have been trained in how to engage. They know prayer exists but don't understand what it accomplishes in the invisible realm. They know about spiritual authority but have never learned to exercise it with precision. The result is a church that is technically equipped by position in Christ but functionally unarmed by ignorance of practice. These two ignorances together produce what Apostle Arome calls believers who were designed to win but live as though they are losing."
      },
      {
        title: "The Gospel Advances Through Contested Ground",
        icon: "flag",
        scripture: "Psalm 2:8",
        verseText: "Ask me, and I will make the nations your inheritance, the ends of the earth your possession.",
        body: "One of the most significant theological adjustments Apostle Arome calls the church to make is in its understanding of how the gospel spreads. The dominant assumption — shaped more by Western pragmatism than by Scripture — is that evangelism is essentially a communications project: craft the right message, deploy the right medium, reach enough people, and the harvest will come. Arome challenges this at the root. Nations are supernaturally contested. Psalm 2:8 invites believers to ask for the nations as their inheritance — implying that the nations are not automatically surrendered to the gospel but must be actively taken in partnership with God. 1 Corinthians 15:30–32 reveals Paul fighting 'wild beasts' in Ephesus — a reference to the demonic resistance he encountered as he brought the gospel into a city. He wasn't casually broadcasting good news. He was advancing through supernatural conflict. This doesn't make evangelism fearful — it makes it strategic. The believer who prays with understanding of territorial resistance prays with entirely different focus and authority than the one who assumes the battle is purely social."
      },
      {
        title: "Consecration Is Your Credential in the War",
        icon: "shield",
        scripture: "2 Timothy 2:21",
        verseText: "Those who cleanse themselves from the latter will be instruments for special purposes, made holy, useful to the Master and prepared to do any good work.",
        body: "Apostle Arome delivers what may be the sharpest word in the sermon about consecration: the believer who is not consecrated has no business going into battle. This is not spiritual elitism — it is a protective principle. 2 Timothy 2:21 connects cleanliness to usefulness: 'those who cleanse themselves will be instruments for special purposes.' The connection between holiness and spiritual authority is not accidental. The seven sons of Sceva in Acts 19 attempted to exercise spiritual authority using a borrowed name — Jesus whom Paul preaches — with no consecrated life behind the invocation. The demonic spirit recognized the discrepancy immediately: 'Jesus I know, Paul I know — but who are you?' The lack of consecration was not merely a spiritual offense; it was a tactical vulnerability. Consecration does not earn God's grace, but it does qualify a life to carry genuine authority in the invisible realm. Apostle Arome's point is direct: before you engage the war, tend to your life. An unholy vessel cannot carry apostolic authority, no matter how loudly it prays."
      }
    ],

    assessment: [
      {
        q: "According to Ephesians 6:12, the primary opposition believers face is:",
        options: [
          "Human systems and governments that resist godly values",
          "The internal battle against sin and personal weakness",
          "Rulers, authorities, powers of darkness, and spiritual forces of evil in heavenly realms",
          "Natural hardships and economic pressures that test faith"
        ],
        correct: 2,
        explanation: "Paul is explicit: 'not against flesh and blood.' The four terms he uses — rulers, authorities, powers of this dark world, spiritual forces of evil in heavenly realms — describe a hierarchy of spiritual opposition. Apostle Arome's teaching builds from this foundation: until you settle that your primary opposition is spiritual, you will always be fighting the wrong enemy."
      },
      {
        q: "What are the two ignorances Apostle Arome identifies as primary causes of powerlessness in the church?",
        options: [
          "Ignorance of Scripture and ignorance of church history",
          "Ignorance of the enemy's devices and ignorance of how to conduct spiritual warfare",
          "Ignorance of prayer and ignorance of fasting",
          "Ignorance of God's love and ignorance of God's holiness"
        ],
        correct: 1,
        explanation: "Apostle Arome identifies two specific knowledge gaps: first, not knowing how Satan operates — his tactics, entry points, and strategies (2 Corinthians 2:11 says Paul was not ignorant of these). Second, not knowing how to actually engage in spiritual warfare — having theoretical belief in prayer and authority without training in how to exercise them. Together, these produce believers who are positionally equipped but functionally disarmed."
      },
      {
        q: "When Paul says in 1 Corinthians 15:32 that he fought 'wild beasts' in Ephesus, what does the sermon argue this refers to?",
        options: [
          "Literal animals in the Roman arena",
          "Hostile human opponents who threatened his life",
          "His own sinful impulses and temptations during ministry",
          "Demonic resistance he encountered as he advanced the gospel in Ephesus"
        ],
        correct: 3,
        explanation: "In context — Paul is writing about resurrection and the high stakes of gospel ministry — the 'wild beasts' reference describes the demonic opposition he encountered while bringing the gospel into Ephesus. Acts 19 records what happened there: extraordinary miracles, the sons of Sceva incident, a riot. Apostle Arome uses this as evidence that gospel advancement is not casual — Paul encountered and overcame organized spiritual resistance."
      },
      {
        q: "What does the sermon say about how nations and territories receive the gospel?",
        options: [
          "Nations receive the gospel naturally when the right cultural strategy is applied",
          "Every nation is spiritually open — the church simply needs enough workers",
          "Nations are supernaturally contested and require prayer-prepared believers to engage spiritual resistance",
          "God will evangelize every nation without human cooperation through signs and wonders alone"
        ],
        correct: 2,
        explanation: "Apostle Arome challenges the assumption that evangelism is primarily a communications project. Psalm 2:8 invites believers to 'ask for the nations' — implying they must be actively taken, not passively broadcast to. Every territory has spiritual forces assigned to resist the gospel's advance. Effective mission requires believers who understand territorial resistance and engage it through consecrated intercession before and during evangelism."
      },
      {
        q: "Why does the sermon say consecration is a prerequisite for warfare — not merely a virtue?",
        options: [
          "Because God only hears the prayers of people with no sin",
          "Because consecration is what impresses demons and makes them fear the believer",
          "Because an unconsecrated life carries no genuine spiritual authority, as the sons of Sceva demonstrated",
          "Because warfare is primarily about moral arguments, not spiritual power"
        ],
        correct: 2,
        explanation: "The sons of Sceva in Acts 19 attempted to exercise spiritual authority with no consecrated life behind it. The demonic response — 'Jesus I know, Paul I know, but who are you?' — revealed that authority in the spiritual realm is backed by a life aligned with Christ, not merely claimed by position. 2 Timothy 2:21 connects cleansing to being 'useful to the Master.' Consecration is not optional preparation — it is the credential that makes the invocation credible."
      }
    ]
  }
};

// ── PIPELINE STEPS ────────────────────────────────────────────────────────────
const PIPELINE_STEPS = [
  { id:'pre-sort',    label:'Discern', icon:'balance',      title:'Pre-Sort'    },
  { id:'watch-sort',  label:'Watch',   icon:'play_circle',  title:'Watch & Sort' },
  { id:'formation',   label:'Study',   icon:'menu_book',    title:'Formation'   },
  { id:'library',     label:'Stones',  icon:'layers',       title:'My Stones'   },
  { id:'assess',      label:'Assess',  icon:'fact_check',   title:'Assess'      },
];
