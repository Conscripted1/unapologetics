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
      { text:"True wisdom is not just knowing God's Word — it is putting it into practice.", topic:"Discipleship", correct:1, community:[80,3,5,8,4], mirrorNote:"You can never trust the construction when you already ignore the instruction. Hearing and knowing are not the same as doing — and doing is what determines whether your house stands." },
      { text:"The most important parts of what you are building are the parts that people cannot see.", topic:"Foundation", correct:1, community:[68,3,10,14,5], mirrorNote:"The support beams had to be drilled deep so that the building could be built tall. The invisible work of prayer, obedience, and private surrender is the foundation everything else stands on." },
      { text:"A believer can genuinely agree with what God says and still never align their life to actually reflect it.", topic:"Obedience", correct:1, community:[73,5,7,10,5], mirrorNote:"Don't just agree with the Word — align with it. You can shout over a sermon you never plan to submit to. Agreement is in a moment; alignment is over a lifetime." },
      { text:"Obedience to God's Word exempts a faithful believer from life's storms.", topic:"Trials", correct:2, community:[5,70,4,12,9], mirrorNote:"Both builders faced the same storm. Obedience did not remove the storm — it determined whether the house stood. The storm is a test of the foundation, not a reward withheld from the faithful." },
      { text:"If someone is going through a painful storm, it is most likely because of sin or spiritual failure in their life.", topic:"Suffering", correct:2, community:[4,55,5,26,10], mirrorNote:"Storms don't create foundations — they expose them. The storm is not a verdict on your behavior; it is a diagnostic on your foundation. Both the wise and foolish builder faced the same storm." },
      { text:"The specific spiritual disciplines a believer practices — daily devotionals vs. weekly study, liturgical prayer vs. spontaneous — is a matter of personal tradition and preference.", topic:"Spiritual Practices", correct:3, community:[10,6,48,30,6], mirrorNote:"Height without depth is a disaster waiting to happen. The form of disciplines may vary by tradition, but the commitment to invisible formation is not optional — it is the foundation of everything visible." },
      { text:"A storm in your life can sometimes be a gift from God, revealing cracks in your foundation while you are still at a level where they can be repaired.", topic:"Trials", correct:4, community:[20,8,5,57,10], mirrorNote:"A storm before the house is built too high can save a life. Whether a storm becomes gift or destruction depends on what you do with what it exposes — a matter of wisdom applied to specific circumstance." },
      { text:"Visible success is a reliable indicator that a person has built their life on the right foundation.", topic:"Foundation", correct:5, community:[6,44,4,15,31], mirrorNote:"Height without depth is a disaster waiting to happen. Some visible success is built on sand, some on rock — and you cannot tell from the outside before the storm hits. This question is malformed." },
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

    preAssessment: [
      {
        type: 'completion',
        sentence: "The wise builder was different from the foolish builder because he heard God's Word and ___ it.",
        options: ["shared", "memorized", "put it into practice", "debated"],
        correct: 2,
        explanation: "Matthew 7:24 — both builders heard the same Word. The only difference was response. The wise builder 'put it into practice.' Knowing and doing are two entirely different things."
      },
      {
        type: 'completion',
        sentence: "Storms don't create weak foundations — they ___ them.",
        options: ["destroy", "expose", "build", "judge"],
        correct: 1,
        explanation: "Both the wise and foolish builder faced the same storm. The storm's function is diagnostic, not punitive — it surfaces what was already true about the foundation before the rain ever came."
      },
      {
        type: 'match',
        instruction: "Connect each concept to its meaning:",
        pairs: [
          { left: "Excavation before elevation", right: "The invisible work that makes the visible possible" },
          { left: "Agreement vs. alignment", right: "Affirming truth without conforming your life to it" },
          { left: "Height without depth", right: "Visible success built without invisible formation" },
          { left: "Storm-proof, not storm-exempt", right: "Obedience ensures you stand through storms, not skip them" }
        ],
        explanation: "These four concepts form the architecture of the sermon. One World Trade Center's 150-foot underground foundation before a single visible floor is the central image — everything visible requires invisible work first."
      },
      {
        type: 'completion',
        sentence: "___ with God's Word happens in a moment. ___ with God's Word happens over a lifetime.",
        options: ["Fighting / Wrestling", "Agreeing / Aligning", "Hearing / Praying", "Believing / Struggling"],
        correct: 1,
        explanation: "The sermon draws from Dallas Willard: agreement is in a moment; alignment is over a lifetime. You can shout over a sermon you never plan to submit to. That gap between the two is where self-deception lives."
      },
      {
        type: 'completion',
        sentence: "The most important work you will ever do is the work that ___.",
        options: ["produces visible results", "earns recognition from others", "no one will ever see", "happens in community"],
        correct: 2,
        explanation: "The paradox of spiritual formation: your private prayer, secret repentance, and hidden surrender are not preparation for the real work — they are the real work. The visible is just what others get to see."
      }
    ],

    discernmentQuestions: [
      { text:"The invisible foundation you build in private determines whether the visible life you build will stand.", topic:"Foundation", correct:1, community:[74,4,4,12,6], mirrorNote:"The support beams were drilled 150 feet into bedrock before a single floor was visible. The invisible work of prayer, obedience, and surrender is the foundation that makes everything else possible." },
      { text:"A believer can genuinely affirm what God says about forgiveness while having never actually forgiven anyone who hurt them.", topic:"Obedience", correct:1, community:[72,5,5,13,5], mirrorNote:"Agreement happens in a moment. Alignment happens over a lifetime. You can shout over a sermon about forgiveness you never plan to submit to. Agreement without alignment is the self-deception James 1:22 describes." },
      { text:"If a follower of Jesus is going through a painful storm, the most helpful first question is: 'What sin caused this?'", topic:"Suffering", correct:5, community:[5,32,6,12,45], mirrorNote:"Both builders faced the same storm — it was not a verdict on behavior. The storm is a diagnostic on the foundation, not a punishment for sin. The first question the storm invites is 'What is this revealing in me?' not 'Why is this happening to me?'" },
      { text:"Spiritual disciplines like private prayer and Scripture study are valuable but not the most important part of the Christian life.", topic:"Spiritual Formation", correct:2, community:[4,68,6,15,7], mirrorNote:"These disciplines ARE the most important work — they are the invisible foundation. Making them secondary is precisely what produces height without depth." },
      { text:"Two believers can face the same difficult season and have entirely different outcomes based solely on what they built their lives on.", topic:"Foundation", correct:1, community:[78,3,4,10,5], mirrorNote:"Both builders faced the same storm — rain, rising streams, wind. The storm didn't change; the foundation did. The same circumstance can destroy one person and reveal the strength of another." },
      { text:"Visible spiritual success — a growing platform, influence, or reputation — is evidence that a person's spiritual foundation is deep.", topic:"Foundation", correct:5, community:[6,42,5,16,31], mirrorNote:"Height without depth is a disaster waiting to happen. Some visible success is built on sand, some on rock — you cannot tell from the outside before the storm hits. This is a malformed question." },
      { text:"It is possible to be very busy for God — serving, attending, giving — while having almost no real private relationship with Him.", topic:"Obedience", correct:1, community:[70,5,5,15,5], mirrorNote:"The distinction between agreement and alignment cuts through religious activity. You can do all the visible things — attend church, serve in ministry — while the invisible foundation is hollow. Busyness for God is not the same as the foundation work of God." },
      { text:"A believer who obeys God's Word will avoid major life storms.", topic:"Trials", correct:2, community:[4,72,5,13,6], mirrorNote:"Both builders faced the same storm. Obedience does not exempt the wise builder from the storm — it ensures the house stands through the storm. Storm-exempt and storm-proof are not the same thing." },
      { text:"The primary measure of a believer's spiritual health is how often they attend church and serve in ministry.", topic:"Spiritual Formation", correct:2, community:[5,65,6,18,6], mirrorNote:"The primary measure is invisible, not visible: the depth of the private foundation. What you do in public tells people what you've built. What you do in private tells you what you've built it on." },
      { text:"James 1:22 suggests that merely hearing God's Word, without doing it, is a form of self-deception.", topic:"Obedience", correct:1, community:[79,3,4,9,5], mirrorNote:"James uses the mirror metaphor — the person who hears God's Word and doesn't do it 'looks at his natural face in a mirror, then immediately forgets what he looks like.' The Mirror step in this module is named after this exact passage." },
      { text:"The storm tests what the foundation actually is — it cannot change what the foundation was before it arrived.", topic:"Trials", correct:1, community:[74,4,4,13,5], mirrorNote:"Storms don't create foundations — they expose them. Both builders' foundations were set before the storm arrived. The storm revealed the truth; it didn't create it." },
      { text:"A person can have great theological knowledge about God's Word while being very far from obeying it.", topic:"Obedience", correct:1, community:[71,4,5,14,6], mirrorNote:"Both builders heard the same Word. The foolish builder presumably understood it. Understanding is not the same as obedience, and the sermon's target is not ignorance — it is the gap between agreement and alignment." },
      { text:"Suffering that reveals a crack in your spiritual foundation is always bad news.", topic:"Trials", correct:2, community:[5,52,7,28,8], mirrorNote:"A storm before the house is built too high can save your life. Revealing a crack while it can still be repaired is one of the most merciful things a storm can do. The sermon invites believers to receive the storm's diagnostic as a gift." },
      { text:"The reason so many believers are surprised and devastated by life's storms is that they built on the wrong foundation.", topic:"Foundation", correct:4, community:[38,5,6,42,9], mirrorNote:"The observation is partly true, but storms surprise people for many reasons. The sermon's point is that the right foundation ensures you stand regardless of surprise. Whether most devastation comes from wrong foundation specifically is a wisdom judgment." },
      { text:"Obedience without visible success is still obedience — the rock-builder's value is in the foundation, not the applause.", topic:"Foundation", correct:1, community:[74,4,4,13,5], mirrorNote:"The wise builder built on the rock before the storm came — with no storm to yet prove it. The value of obedience is not its visible vindication but its foundational integrity. The storm just confirms what was already true." }
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
      { text:"God does not waste wilderness seasons — the pain, waiting, and testing are purposeful formation, not pointless suffering.", topic:"Formation", correct:1, community:[71,4,4,14,7], mirrorNote:"Wilderness seasons are God's classroom, not His punishment. God led Israel through the wilderness to humble and test them — to reveal what was in their hearts. The wilderness was never a detour. It was the plan." },
      { text:"A person can be physically free from a painful season while still mentally enslaved to it.", topic:"Identity & Mindset", correct:1, community:[78,4,4,9,5], mirrorNote:"You cannot carry Egypt's mindsets into the Promised Land. God's deliverance changes your location. Only His formation changes your self-perception. You can leave Egypt while still carrying Egypt inside you." },
      { text:"What kept Israel from the Promised Land was not the giants — it was Israel's fear of the giants.", topic:"Numbers 13", correct:1, community:[76,4,3,10,7], mirrorNote:"Israel named themselves 'grasshoppers' before the giants did. The giants didn't disqualify Israel — Israel disqualified themselves by believing a slave identity that no longer applied to them." },
      { text:"Not one word of all of God's good promises has ever failed.", topic:"God's Faithfulness", correct:1, community:[82,3,3,7,5], mirrorNote:"God's promises are not canceled by delay — not a word has failed. Joshua 21:45 declares this over Israel's entire history. The first generation didn't make it in, but the promise was never canceled." },
      { text:"New seasons from God always feel peaceful and free of fear — if something feels scary, it probably isn't from Him.", topic:"Discernment", correct:5, community:[6,23,5,14,52], mirrorNote:"Crossing the Jordan was terrifying. The Promised Land required confronting giants. God's seasons often feel exactly like what they require — courage, not comfort. Demanding peace as proof of God's leading is a malformed question." },
      { text:"Returning to a familiar situation after God has called you forward always means you have failed in faith.", topic:"Discernment", correct:5, community:[8,22,7,20,43], mirrorNote:"Wilderness seasons are God's classroom, not His punishment. Whether returning represents retreat or redemption depends on context, motive, and what God is specifically doing. Neither 'always' nor 'never' captures the full picture." },
      { text:"What others have named you — failure, grasshopper, slave — is more accurate than what God says about you.", topic:"Identity", correct:2, community:[3,73,4,6,14], mirrorNote:"Israel named themselves 'grasshoppers' before the giants did. The question every believer must answer is whose word they will believe about themselves. God had already spoken — the spies chose to override it with a slave identity." },
      { text:"If God has not fulfilled His promise to you yet, He has probably moved on to someone more faithful.", topic:"God's Faithfulness", correct:2, community:[2,78,3,5,12], mirrorNote:"God's promises are not canceled by delay — not a word has failed. Hebrews 10:35-36 says perseverance is needed to receive what God has promised. The delay is formation, not abandonment." },
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

    sermonPoints: [
      { id:1, title:"Israel Stands at the Edge of Promise", summary:"Israel reaches promise, but fear interprets the land.", timestamp:"0:00", url:"https://www.youtube.com/watch?v=_wSqePjcVf0&t=0s" },
      { id:2, title:"You Can't Bring Egypt With You", summary:"You cannot enter promise while carrying Egypt within.", timestamp:"2:36", url:"https://www.youtube.com/watch?v=_wSqePjcVf0&t=156s" },
      { id:3, title:"Every New Season Demands a New You", summary:"Every new season demands a new version of you.", timestamp:"4:49", url:"https://www.youtube.com/watch?v=_wSqePjcVf0&t=289s" },
      { id:4, title:"New Seasons Expose Old Mindsets", summary:"New seasons expose mindsets formed by old bondage.", timestamp:"7:55", url:"https://www.youtube.com/watch?v=_wSqePjcVf0&t=475s" },
      { id:5, title:"Old Mindsets Contradict God's Truth", summary:"Old mindsets agree with the past over God's truth.", timestamp:"12:25", url:"https://www.youtube.com/watch?v=_wSqePjcVf0&t=745s" },
      { id:6, title:"The Wilderness Was Meant to Change Them", summary:"The wilderness forms what the promise requires.", timestamp:"14:57", url:"https://www.youtube.com/watch?v=_wSqePjcVf0&t=897s" },
      { id:7, title:"God Reforms Identity, Dependency, and Trust", summary:"God reshapes identity, dependency, and trust in transition.", timestamp:"20:40", url:"https://www.youtube.com/watch?v=_wSqePjcVf0&t=1240s" },
      { id:8, title:"Leaving Egypt Is Worth It", summary:"Leaving Egypt is painful, but the promise is worth it.", timestamp:"24:50", url:"https://www.youtube.com/watch?v=_wSqePjcVf0&t=1490s" }
    ],

    preAssessment: [
      {
        type: 'completion',
        sentence: "The wilderness was never a ___ from God's plan — it was the plan.",
        options: ["shortcut", "detour", "punishment", "delay"],
        correct: 1,
        explanation: "Deuteronomy 8:2 — God led Israel through the wilderness 'to humble you, testing you to know what was in your heart.' The wilderness wasn't a divine oversight — it was the designed curriculum."
      },
      {
        type: 'completion',
        sentence: "Israel said 'we seemed like ___ in our own eyes' before the Canaanites ever said it about them.",
        options: ["strangers", "failures", "grasshoppers", "wanderers"],
        correct: 2,
        explanation: "Numbers 13:33. The spies called themselves grasshoppers before the giants did. This is the grasshopper problem: preemptive self-disqualification using a slave identity that God had already cancelled."
      },
      {
        type: 'match',
        instruction: "Connect each concept to what it reveals:",
        pairs: [
          { left: "Leaving Egypt", right: "Changes your location, not your mindset" },
          { left: "Carrying Egypt", right: "Staying anchored to a slave identity after you've been freed" },
          { left: "The wilderness", right: "God's curriculum for forming who the promise requires" },
          { left: "The grasshopper problem", right: "Preemptive self-disqualification with a past identity" }
        ],
        explanation: "Egypt here is not a geography — it is a psychology. God's deliverance changes your location; only His formation changes your self-perception. The wilderness is where that transformation happens."
      },
      {
        type: 'completion',
        sentence: "Not one word of all the good ___ that the LORD had made to Israel had failed.",
        options: ["laws", "warnings", "promises", "instructions"],
        correct: 2,
        explanation: "Joshua 21:45 — every promise came to pass. God's delay is not God's denial — the first generation didn't make it in, but the promise was never canceled."
      },
      {
        type: 'completion',
        sentence: "God's ___ is not God's denial — He is forming the person worthy of the promise.",
        options: ["silence", "delay", "correction", "judgment"],
        correct: 1,
        explanation: "Hebrews 10:35–36 says perseverance is needed to receive what God has promised. The interval between promise and fulfillment is not abandonment — it is the formation corridor where the promise becomes personally possible."
      },
      {
        type: 'match',
        instruction: "Match each half of the key teaching:",
        pairs: [
          { left: "God's deliverance...", right: "...changes your location" },
          { left: "God's formation...", right: "...changes your self-perception" },
          { left: "New seasons expose...", right: "...old mindsets formed by bondage" },
          { left: "Wilderness seasons are...", right: "...God's classroom, not His punishment" }
        ],
        explanation: "These four pairings form the spine of the sermon. The central question it leaves the listener with is not 'When will this end?' but 'What is God forming in me through this?'"
      }
    ],

    discernmentQuestions: [
      { text:"God does not waste wilderness seasons — the pain, waiting, and testing are purposeful formation, not pointless suffering.", topic:"Formation", correct:1, community:[71,4,4,14,7], mirrorNote:"Wilderness seasons are God's classroom, not His punishment. God led Israel through the wilderness to humble and test them — to reveal what was in their hearts. The wilderness was never a detour. It was the plan." },
      { text:"A person can be physically free from a painful season while still mentally enslaved to it.", topic:"Identity & Mindset", correct:1, community:[78,4,4,9,5], mirrorNote:"You cannot carry Egypt's mindsets into the Promised Land. God's deliverance changes your location. Only His formation changes your self-perception. You can leave Egypt while still carrying Egypt inside you." },
      { text:"Physical freedom from a painful season automatically produces internal freedom from its effects.", topic:"Formation", correct:2, community:[5,74,4,11,6], mirrorNote:"Israel left Egypt but carried Egypt inside them. God's deliverance changes your location; only His formation changes your self-perception." },
      { text:"The mindsets formed in seasons of bondage don't automatically disappear when the bondage ends.", topic:"Identity & Mindset", correct:1, community:[77,3,4,11,5], mirrorNote:"400 years of slavery formed a way of thinking. The chains were broken at the Exodus, but the identity hadn't been renewed. That's why God needed the wilderness." },
      { text:"What kept Israel from the Promised Land was not the giants — it was Israel's fear of the giants.", topic:"Numbers 13", correct:1, community:[76,4,3,10,7], mirrorNote:"Israel named themselves 'grasshoppers' before the giants did. The giants didn't disqualify Israel — Israel disqualified themselves by believing a slave identity that no longer applied." },
      { text:"Not one word of all of God's good promises has ever failed.", topic:"God's Faithfulness", correct:1, community:[82,3,3,7,5], mirrorNote:"God's promises are not canceled by delay — not a word has failed. Joshua 21:45 declares this over Israel's entire history." },
      { text:"New seasons from God always feel peaceful and free of fear — if something feels scary, it probably isn't from Him.", topic:"Discernment", correct:5, community:[6,23,5,14,52], mirrorNote:"Crossing the Jordan was terrifying. The Promised Land required confronting giants. God's seasons often feel exactly like what they require — courage, not comfort. This is a malformed question." },
      { text:"What others have named you — failure, grasshopper, slave — is more accurate than what God says about you.", topic:"Identity", correct:2, community:[3,73,4,6,14], mirrorNote:"Israel named themselves 'grasshoppers' before the giants did. The question every believer must answer is whose word they will believe about themselves. God had already spoken — the spies chose to override it with a slave identity." },
      { text:"If God has not fulfilled His promise to you yet, He has probably moved on to someone more faithful.", topic:"God's Faithfulness", correct:2, community:[2,78,3,5,12], mirrorNote:"God's promises are not canceled by delay — not a word has failed. Hebrews 10:35-36 says perseverance is needed to receive what God has promised. The delay is formation, not abandonment." },
      { text:"A person can enter a new season God has prepared for them while still operating from the mindsets of the old one.", topic:"Transition", correct:1, community:[74,4,4,13,5], mirrorNote:"Israel crossed the Red Sea but never fully crossed out of Egypt's worldview. Every new season demands a new version of you — not just a new address." },
      { text:"A new season from God is designed to be comfortable — if it's uncomfortable, it's likely not from Him.", topic:"Discernment", correct:2, community:[5,65,6,16,8], mirrorNote:"Every new season exposes old mindsets formed in the previous one. Discomfort in a new season is often the friction between who you've been and who the season requires you to become." },
      { text:"The purpose of the wilderness was to reveal what was already in Israel's hearts — not to create something new.", topic:"Formation", correct:1, community:[73,4,4,13,6], mirrorNote:"Deuteronomy 8:2 — 'to know what was in your heart.' The wilderness was God's diagnostic. It surfaced the slave mentality that 400 years had built so that God could rebuild it." },
      { text:"God's primary goal in transition seasons is to change your circumstances as quickly as possible.", topic:"God's Nature", correct:2, community:[4,72,5,12,7], mirrorNote:"God's primary goal in transition is not to change your circumstances — it is to change you. God reforms identity, dependency, and trust. Circumstances follow formation, they don't precede it." },
      { text:"The three things God specifically reforms in transition seasons are: identity, dependency, and trust.", topic:"Formation", correct:1, community:[68,4,5,16,7], mirrorNote:"God doesn't just move you from slavery to freedom — He rebuilds who you think you are, what you rely on, and who you trust. These three transformations are what make the Promised Land possessable." },
      { text:"God's promise to you will come to pass even if it skips one generation.", topic:"God's Faithfulness", correct:4, community:[25,8,8,48,11], mirrorNote:"The promise to Abraham came through Isaac, then Jacob, then finally through Joshua. The promise was never canceled — it found its generation. Whether it applies to 'your' generation is a matter of wisdom and discernment." },
      { text:"The spies' report about the giants was factually accurate but spiritually malformed.", topic:"Discernment", correct:4, community:[38,5,6,41,10], mirrorNote:"The giants were real. The obstacles were real. What was malformed was the conclusion: that the obstacles disqualified them. Accurate perception does not always produce accurate interpretation." },
      { text:"God's delay in fulfilling a promise is always evidence that the believer made a mistake or missed a window.", topic:"God's Faithfulness", correct:2, community:[3,74,4,11,8], mirrorNote:"Joshua 21:45 — not one word of all God's promises had failed. The delay is formation, not evidence of error. The generation that inherited the promise was not the generation that first received it." },
      { text:"Wilderness seasons are God's classroom, not His punishment.", topic:"Formation", correct:1, community:[74,4,4,12,6], mirrorNote:"Moses tells Israel that God led them through the wilderness to humble and test them — to reveal what was in their hearts. The wilderness was never a detour from God's plan. It was the plan." },
      { text:"A believer who struggles to trust God in a new season despite past experience of His faithfulness is demonstrating shallow faith.", topic:"Faith", correct:5, community:[6,28,6,14,46], mirrorNote:"Israel had experienced the Exodus — the most dramatic divine intervention in their history — and still struggled at the border of the promise. Past experience does not automatically produce present trust. Faith is a daily practice, not a permanent achievement. This is a malformed standard." },
      { text:"God's promise is worth the pain of the formation corridor required to receive it.", topic:"Formation", correct:1, community:[77,3,4,11,5], mirrorNote:"Leaving Egypt is painful but the promise is worth it. The formation corridor is hard — but what it leads to is exactly what God said. The sermon's final word is that the cost of formation is worth the prize of the promise." }
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

  'victory-valley': {
    id: 'victory-valley',
    title: "Victory from the Valley",
    series: 'Union Church',
    community: 'Union Church',
    date: 'Jun 28, 2026',
    type: 'Formation',
    duration: '45 min',
    scripture: 'Ezekiel 37:1',
    videoId: '2TunS0W3dt8',

    preSortStatements: [
      { text:"God carries people into valley seasons as a form of punishment or discipline for sin.", topic:"Valleys & Suffering", correct:2, community:[5,74,5,10,6], mirrorNote:"Ezekiel had no scriptural evidence of wrongdoing — the hand of the Lord simply carried him and set him in the valley. The valley wasn't punishment; it was revelation. You can be doing all the right things and still find yourself in the valley." },
      { text:"Because the hand of the Lord is upon you in the valley, you are not only assigned to it — you are anointed for it.", topic:"Anointing", correct:1, community:[74,4,4,12,6], mirrorNote:"Ezekiel 37:1 — 'the hand of the Lord was upon me.' Not only assigned to the valley, but anointed for it. There is a problem in your valley that you have been specifically equipped by God to face and solve." },
      { text:"The healthiest response to a valley season is to stay still and wait for God to move you out of it.", topic:"Valleys & Action", correct:2, community:[5,68,6,14,7], mirrorNote:"God doesn't put you in the valley for you to sit — He puts you there because He's trying to get something for you to see. 'Every place the sole of your feet shall tread shall become yours.' The valley is territory to be walked and claimed, not a bench." },
      { text:"When God wants to transform something in your life, He usually moves you to a better environment before He changes you.", topic:"Transformation", correct:2, community:[5,70,5,12,8], mirrorNote:"Zara renovated without leaving the mall. Transformation doesn't come with transportation. God often doesn't change your environment — He changes you in it. You may be asking God to move you when He is trying to make you the answer where you already are." },
      { text:"The problem that consistently frustrates you most — the one others walk past without caring — is often a sign you are anointed to solve it.", topic:"Calling", correct:1, community:[70,4,5,16,5], mirrorNote:"When you care about something that other people don't care about, it is a clear indication that you're the one placed there to solve it. Your frustration with what others ignore is often the fingerprint of your anointing." },
      { text:"A person can get divine results inside a dead environment when they are anointed.", topic:"Anointing", correct:1, community:[75,4,4,12,5], mirrorNote:"Hiroshima's landscape was a gray wasteland — yet plants emerged within one year. When the devil sets off a bomb in your life, he didn't account for what God can still grow from the ashes. Anointing is most visible when it produces results where others cannot." },
      { text:"Speaking God's Word over seemingly dead situations — prophesying to the bones — can reverse what took years of decay.", topic:"Prophetic Declaration", correct:1, community:[73,4,4,14,5], mirrorNote:"God told Ezekiel to prophesy to the bones, and what had decayed over decades began to reverse in an instant. What looks permanently dead in your situation is subject to the Word of God spoken over it with faith and authority." },
      { text:"Once the Word has been declared and the structure returns, life will naturally follow without any further need for the Spirit.", topic:"Holy Spirit", correct:2, community:[5,72,5,12,6], mirrorNote:"Bones came together when Ezekiel prophesied — but nothing was yet alive. God said the equation wasn't complete: prophesy also to the wind (ruach/Spirit). You need both Word AND Spirit. Structure without breath is still a skeleton." },
    ],

    arguments: [
      { text:'"The valley wasn\'t punishment. The valley was revelation."', timestamp:'13:29' },
      { text:'"Not only am I assigned to this valley — I\'m anointed for this valley."', timestamp:'15:05' },
      { text:'"You can\'t let what\'s dead around you kill what\'s alive inside of you."', timestamp:'19:43' },
      { text:'"Transformation doesn\'t come with transportation."', timestamp:'23:56' },
      { text:'"I know I\'m anointed when I get divine results in dead environments."', timestamp:'26:25' },
      { text:'"Stop praying, God get me out — start praying, God make me the answer."', timestamp:'29:14' },
      { text:'"This is not the season to get quiet. This is the season to prophesy to the bones."', timestamp:'33:06' },
      { text:'"You\'ve got to get the wind of the Holy Ghost — the same power that raised Jesus from the dead."', timestamp:'37:02' },
    ],

    sortStatements: [
      { text:'"The valley wasn\'t punishment — it was revelation. God assigns it because there\'s something He needs you to see."', topic:"Valleys", correct:1, community:[76,4,4,11,5] },
      { text:'"Not only are you assigned to this valley — the hand of the Lord upon you means you are anointed for it."', topic:"Anointing", correct:1, community:[74,4,4,12,6] },
      { text:'"You can\'t let what\'s dead around you kill what\'s alive inside of you."', topic:"Resilience", correct:1, community:[79,3,3,10,5] },
      { text:'"Transformation doesn\'t come with transportation — sometimes God does it right in the middle of your current environment."', topic:"Transformation", correct:1, community:[77,3,4,11,5] },
      { text:'"I know I\'m anointed when I get divine results in dead environments."', topic:"Anointing", correct:4, community:[42,5,6,40,7] },
      { text:'"Stop praying God get me out — start praying God make me the answer."', topic:"Prayer", correct:4, community:[44,5,6,39,6] },
      { text:'"This is not the season to get quiet. This is the season to prophesy to the bones."', topic:"Declaration", correct:1, community:[73,4,4,14,5] },
      { text:'"You\'ve got to get the wind of the Holy Ghost — the Word alone is not enough to bring dead things back to life."', topic:"Holy Spirit", correct:1, community:[71,4,4,15,6] },
    ],

    formation: [
      {
        title: "Assigned AND Anointed",
        icon: "bolt",
        scripture: "Ezekiel 37:1",
        verseText: "The hand of the Lord was upon me, and he brought me out in the Spirit of the Lord and set me down in the middle of the valley; it was full of bones.",
        body: "The most unsettling thing about Ezekiel 37:1 is what it reveals about how valleys work. Ezekiel did not volunteer for this assignment. There is no scriptural evidence he had done anything wrong. The hand of the Lord — not his failure — carried him and set him down in the midst of a valley full of dry bones. This is the first thing God needs you to hear: some valleys have your name on them not because of what you did but because of what He wants to do. The valley was not punishment. The valley was revelation. But there is a second truth buried in the same verse that is easy to miss when you're focused on the bones all around you. 'The hand of the Lord was upon me.' That phrase in Scripture consistently signals anointing — a specific equipping of a person for a purpose God intends to accomplish through them. Which means the valley that was assigned to Ezekiel was also the valley he was anointed for. You cannot accept God's mountain tops and avoid His valleys — but the valleys you have been assigned are also the valleys you have been anointed for. There is something in the problem you are standing in right now that you have been specifically equipped by God to address."
      },
      {
        title: "Walk Around the Valley",
        icon: "directions_walk",
        scripture: "Joshua 1:3",
        verseText: "Every place that the sole of your foot will tread upon I have given to you, just as I promised to Moses.",
        body: "One of the primary symptoms of a valley season is hopelessness. When everything around you is dead, the human tendency is to stop — stop planning, stop pursuing, stop investing. God's first instruction to Ezekiel is to survey the valley — to walk around it rather than sit in it. This instruction connects to a recurring principle in Scripture: every place the sole of your feet shall tread shall become yours. The valley is not a waiting room with a bench — it is territory that belongs to whoever walks it. The believer who sits in their valley, paralyzed by what surrounds them, forfeits the very ground God has assigned them to claim. Walking around the valley does not mean pretending it isn't hard. It means refusing to let what is dead around you kill what is still alive inside you. There is something in you that has not died — a vision, a calling, a conviction — and the valley's most powerful weapon is the lie that what looks dead outside also reflects what is dead inside. Walk. Survey. Claim the territory. Every step you take in that valley is a claim God is honoring."
      },
      {
        title: "Work With What's in the Valley",
        icon: "build",
        scripture: "Isaiah 43:19",
        verseText: "Behold, I am doing a new thing; now it springs forth, do you not perceive it? I will make a way in the wilderness and rivers in the desert.",
        body: "God gives Ezekiel an assignment but never changes his environment. He is still surrounded by dry bones when God speaks. And this is where the sermon's most practically challenging word lands: transformation doesn't come with transportation. Too often we ask God to move us out of the environment before He does the work — to put us in a new city, a new job, a new relationship — because we don't like the conditions of where we are. But God's answer is frequently different. He prepares a table in the presence of your enemies, not after they leave. He makes a way in the wilderness and rivers in the desert — not after you've left the wilderness. The problem that frustrates you most — the thing others walk past without caring — is likely a signal that you were placed there to solve it. You are anointed when you get divine results in dead environments. Not when everything is perfect, not when everyone affirms you, not when the resources are in place. When you produce in a place that has no business producing anything, that is the fingerprint of anointing. Stop asking God to take you out of the environment. Start asking Him to make you the answer within it."
      },
      {
        title: "Wait for the Wind",
        icon: "air",
        scripture: "Ezekiel 37:9",
        verseText: "Then he said to me, Prophesy to the breath; prophesy, son of man, and say to the breath, Thus says the Lord God: Come from the four winds, O breath, and breathe on these slain, that they may live.",
        body: "After Ezekiel prophesied to the bones, something remarkable happened: they came back together. Tendons and flesh returned. But nothing was yet alive. God said the equation was not complete — prophesy also to the wind. The Hebrew word here is ruach, which carries both meanings simultaneously: breath and spirit. To prophesy to the wind was to call for the very Spirit of God to move. This pattern is not new. Genesis 1 begins with the same dynamic: God's word goes forth over a formless void, and the Spirit of God hovers over the face of the water. Both are required for creation. You cannot produce life from a skeleton alone, no matter how perfectly the bones are reassembled. The Word without the Spirit gives structure; the Spirit without the Word gives movement without form. Both are necessary. This is the call to the believer in the valley: you cannot just read your Bible and hope things improve. You must create the atmosphere — through worship, through declaration, through prayer in the Spirit — that makes your valley conducive for the miracle God has already planned. The same power that raised Jesus from the dead is available to quicken and bring life to the dead places in your story. The bones are beginning to rattle. The wind is coming."
      }
    ],

    preAssessment: [
      {
        type: 'completion',
        sentence: "In Ezekiel 37:1, God didn't send Ezekiel to the valley as punishment — the valley was assigned as ___.",
        options: ["a test of endurance", "revelation", "correction", "humiliation"],
        correct: 1,
        explanation: "The sermon's core thesis: Ezekiel had no scriptural evidence of wrongdoing. The hand of the Lord — not his failure — placed him in the valley. God assigns valleys because there is something He needs you to see, not because He is angry."
      },
      {
        type: 'completion',
        sentence: "You know you're in a valley season when hope is replaced by ___ — just doing what you have to do to get by.",
        options: ["prayer", "endurance", "maintenance", "routine"],
        correct: 2,
        explanation: "The sermon names three signs of a valley season: what used to excite you no longer moves you; isolation feels more comfortable than community; and hope is replaced by maintenance — going through the motions with no expectation of real change."
      },
      {
        type: 'match',
        instruction: "Match each valley principle to its meaning:",
        pairs: [
          { left: "Assigned to the valley", right: "God placed you there — not accident or punishment" },
          { left: "Anointed for the valley", right: "The hand of the Lord equips you for what's in it" },
          { left: "Walk around the valley", right: "Every place you tread becomes yours — don't sit" },
          { left: "Prophesy to the wind", right: "Create the atmosphere for the Holy Spirit to bring life" }
        ],
        explanation: "These four moves form the architecture of getting victory from the valley. The assignment and anointing come together; then the action — walking, working, and inviting the Spirit."
      },
      {
        type: 'completion',
        sentence: "When God asked Ezekiel 'Can these bones live?', the sermon says He wasn't looking for information — He was looking for Ezekiel's ___.",
        options: ["obedience first", "perspective", "strength", "confession"],
        correct: 1,
        explanation: "When God asks you a question, it's not because He doesn't know the answer. He's trying to see what your perspective is — do you know what your God is capable of, even when the environment looks completely dead? The question was an invitation to partnership, not a test of information."
      },
      {
        type: 'completion',
        sentence: "The Hebrew word ruach, translated 'wind' in Ezekiel 37:9, also means ___.",
        options: ["fire", "voice", "breath and spirit", "presence"],
        correct: 2,
        explanation: "Ruach carries both meanings simultaneously: breath and spirit. This is why prophesying to the wind was calling for the Spirit of God to breathe life into what the Word had structurally reassembled. Just as Genesis 1 required the hovering Spirit alongside the spoken Word, Ezekiel 37 required both."
      }
    ],

    discernmentQuestions: [
      { text:"God carries people into valley seasons as a consequence of their sin or spiritual failure.", topic:"Valleys & Suffering", correct:2, community:[5,74,5,10,6], mirrorNote:"Ezekiel had no scriptural evidence of wrongdoing. The hand of the Lord carried him and set him in the valley. You can be doing all the right things — tithing, serving, attending — and still find yourself in the valley. It wasn't punishment; it was revelation." },
      { text:"Some valleys in a believer's life are specifically assigned by God — placed there for revelation, not as discipline.", topic:"God's Leading", correct:1, community:[74,4,4,12,6], mirrorNote:"Ezekiel 37:1 — the hand of the Lord set him in the valley. God assigns valleys because there is something He needs you to see. The valley is not accidental; it is intentional." },
      { text:"Because the hand of the Lord is upon you in the valley, you are not only assigned to it — you are anointed for it.", topic:"Anointing", correct:1, community:[73,4,4,13,6], mirrorNote:"The first part of Ezekiel 37:1 says 'the hand of the Lord was upon me.' Not only assigned — anointed. There is a problem in your current valley that you have specifically been equipped by God to face and solve." },
      { text:"The healthiest response to a valley season is to wait patiently in stillness for God to move you out.", topic:"Valleys & Action", correct:2, community:[5,68,6,14,7], mirrorNote:"God doesn't put you in the valley for you to sit — He puts you there because He's trying to get you to see something. 'Every place the sole of your feet shall tread shall become yours.' The valley is territory to be walked, not a waiting room." },
      { text:"Transformation often happens inside the existing environment — God does not always relocate you before He changes you.", topic:"Transformation", correct:1, community:[76,3,4,12,5], mirrorNote:"Zara renovated without leaving the mall. David's table was prepared in the presence of his enemies. God doesn't take you out of the environment — He does it right in the middle. Transformation doesn't come with transportation." },
      { text:"A person's consistent frustration with a problem that others ignore is often a signal that they are anointed to solve it.", topic:"Calling", correct:4, community:[44,5,6,38,7], mirrorNote:"The sermon presents this as a strong indicator of anointing. But whether any specific frustration is a calling marker or simply a personality preference requires discernment. The principle points toward anointing; the specific application is a wisdom judgment." },
      { text:"A person can be anointed by God even when surrounded by a completely dead and unresponsive environment.", topic:"Anointing", correct:1, community:[76,3,4,12,5], mirrorNote:"Hiroshima's landscape was a gray wasteland — yet plants grew within a year. God can still grow things in beautiful ashes. Anointing is most visible precisely when it produces results where others cannot." },
      { text:"Speaking God's Word over dead situations is unnecessary — He will act sovereignly whenever He chooses, regardless of declaration.", topic:"Prophetic Declaration", correct:2, community:[5,74,5,10,6], mirrorNote:"God told Ezekiel to prophesy to the bones — the act of declaration was not optional. The bones responded when the Word was spoken. Sovereign action and human declaration are not opposites in Scripture; they are partners." },
      { text:"Once the Word has been declared and structure is restored, life will follow naturally without further need for the Spirit.", topic:"Holy Spirit", correct:2, community:[5,72,5,12,6], mirrorNote:"Bones came back together after the first prophecy, but nothing was yet alive. God said the equation wasn't complete — prophesy also to the wind (ruach). Word and Spirit are both necessary. Structure without breath is still a skeleton." },
      { text:"Hopelessness in a valley season naturally stops a person from planning, pursuing, and investing in their future.", topic:"Valleys & Suffering", correct:1, community:[75,4,4,12,5], mirrorNote:"The BMC Public Health study cited in the sermon confirms what Scripture implies: sitting produces hopelessness, and hopelessness stops planning, fighting, and investing. The valley's most powerful weapon is the paralysis it produces — which is why the first command is to walk." },
      { text:"The principle of polarity means that if you are in a valley right now, eventually the season will shift toward the mountain.", topic:"Valleys & Suffering", correct:4, community:[42,5,6,40,7], mirrorNote:"The sermon presents Newton's third law and the principle of polarity as a general truth — when life is spiraling down, sooner or later it gets up. As a general pattern this is sound; specific timing and manner are in God's sovereign hands. This is wisdom territory." },
      { text:"What looks permanently dead in a believer's life is beyond God's power to restore.", topic:"God's Power", correct:2, community:[3,80,4,8,5], mirrorNote:"Dry bones — long past decay — came back to life at God's word. Hiroshima grew plants within a year of an atomic bomb. God specializes in what looks finished. What took decades of decay can be reversed in an instant by His Word and Spirit." },
      { text:"The bones in Ezekiel 37 represented not only individuals but the families and bloodlines of a nation — and God's wind came to restore entire lineages.", topic:"Ezekiel 37", correct:1, community:[71,4,4,15,6], mirrorNote:"The valley was believed to contain the bones of an army — people's families died there. Last names were buried in that valley. God's wind was sent to restore everything connected — generational restoration, not just individual resurrection." },
      { text:"Creating an atmosphere conducive for a miracle — through worship, declaration, and openness to the Holy Spirit — is part of the believer's active responsibility.", topic:"Holy Spirit", correct:4, community:[44,5,7,38,6], mirrorNote:"Ezekiel had to prophesy to the wind for the atmosphere to become conducive. But whether atmosphere preparation is primarily the believer's responsibility or God's sovereign initiation is a genuine tension in pneumatology. The sermon leans toward human participation; full sovereignty belongs to God. This is wisdom territory." },
      { text:"The same power that raised Jesus from the dead is available to quicken and bring life to dead situations in a believer's life.", topic:"Holy Spirit", correct:1, community:[78,3,4,10,5], mirrorNote:"Romans 8:11 — 'the same Spirit who raised Christ from the dead will also give life to your mortal bodies.' The wind that came to Ezekiel's valley is the same Spirit. What God did at the resurrection is the same power available to the dead places in your story." }
    ],

    assessment: [
      {
        q: "According to the sermon, why did God carry Ezekiel to a valley full of dry bones?",
        options: [
          "To discipline him for a sin he had committed",
          "To reveal something — valleys are assigned for revelation, not punishment",
          "To test whether Ezekiel would stay faithful even in difficulty",
          "To demonstrate God's judgment over Israel's disobedience"
        ],
        correct: 1,
        explanation: "The sermon's central argument is that the valley wasn't punishment — it was revelation. Ezekiel had no scriptural evidence of wrongdoing. The hand of the Lord carried him there. God assigns valleys because there is something He needs you to see. The assignment is purposeful, not punitive."
      },
      {
        q: "What does the sermon mean when it says you are not just 'assigned' to the valley but 'anointed' for it?",
        options: [
          "God gives valley-dwellers supernatural gifts unavailable to people on the mountain",
          "Surviving difficulty is itself evidence of superior faith",
          "The hand of the Lord being upon you means you are specifically equipped for the challenge in your valley",
          "Anointing removes the pain of the valley season"
        ],
        correct: 2,
        explanation: "Ezekiel 37:1 opens with 'the hand of the Lord was upon me' — the phrase Scripture consistently uses to signal anointing. The sermon draws the distinction: being assigned to the valley means you're there; being anointed for it means you're equipped for what is there. The problem in your valley is one you have been specifically prepared to solve."
      },
      {
        q: "What does the Zara renovation illustration explain about how God works?",
        options: [
          "God sometimes closes things down before He rebuilds them from scratch",
          "God often transforms people and situations within their existing environment, not by removing them from it",
          "Physical renovation is a spiritual metaphor for salvation",
          "God prefers gradual change over sudden transformation"
        ],
        correct: 1,
        explanation: "Zara didn't close the store or move to a new location — they renovated within the space they were already in. Spiritually: transformation doesn't come with transportation. You may be asking God to move you when He is trying to make you the answer where you already are. God prepared David's table in the presence of his enemies, not after they left."
      },
      {
        q: "Why does God tell Ezekiel to prophesy to both the bones AND the wind (ruach)?",
        options: [
          "Because the first prophecy failed and needed to be repeated in a different form",
          "Because the bones required the Word to reassemble structurally, and then the Spirit to bring life",
          "Because Ezekiel's faith needed to be tested twice before God would act",
          "Because the wind represented the prayers of the Israelites who had died in the valley"
        ],
        correct: 1,
        explanation: "After Ezekiel prophesied to the bones, they came together — but nothing was yet alive. God said the equation was not complete. Ruach means both breath and spirit. Just as Genesis 1 needed both the spoken Word and the hovering Spirit, Ezekiel 37 required both. Structure without breath is still a skeleton."
      },
      {
        q: "Which statement best captures the three-part framework this sermon gives for getting victory from the valley?",
        options: [
          "Pray, fast, and wait for God to act on your behalf",
          "Repent, believe, and confess so the valley will end",
          "Walk around it, work with what's in it, and wait for the wind of the Spirit",
          "Accept it, endure it, and eventually you will reach the mountain"
        ],
        correct: 2,
        explanation: "The three points form a practical theology of the valley: (1) Walk around the valley — survey your territory and refuse to sit, because every place you tread becomes yours. (2) Work with what's in the valley — you are anointed to be the answer in the environment you're in, not after you leave it. (3) Wait for the wind — prophesy to the bones AND create the atmosphere for the Holy Spirit to breathe life into what the Word has reassembled."
      }
    ]
  },

  'im-authorized': {
    id: 'im-authorized',
    title: "I'm Authorized",
    series: 'Union Church',
    community: 'Union Church',
    date: 'Jan 21, 2026',
    type: 'Theology',
    duration: '40 min',
    scripture: 'Matthew 8:5–13',
    videoId: 'VgJuzq3tDmw',

    preSortStatements: [
      { text:"I can walk in spiritual authority without being in spiritual submission — my personal relationship with God is what matters most.", topic:"Authority", correct:2, community:[5,72,8,10,5], mirrorNote:"The centurion's entire revelation was that because he was under authority, he had authority. 'I am a man under authority.' He understood that Jesus' power came from His submission to the Father. You cannot command what you do not carry, and you cannot carry what you're not connected to." },
      { text:"There is no meaningful difference between praying to God about a problem and speaking directly to the problem under the authority of Christ.", topic:"Prayer", correct:2, community:[8,55,22,10,5], mirrorNote:"Jesus did not pray to the Father when the storm was raging. He spoke to the elements: 'Peace, be still.' Pastor Wayne draws the distinction: stop praying about the situation and start speaking to the situation. Authority is voiced, not just petitioned." },
      { text:"Every believer inherits spiritual authority in Christ through their identity as God's child, not through their spiritual performance.", topic:"Identity", correct:1, community:[74,4,5,12,5], mirrorNote:"Mephibosheth was brought to the king's table not because of anything he had done, but because of his father's legacy and the covenant David had made. You inherit your authority through your position in Christ (Eph 2:6), not through your spiritual résumé." },
      { text:"When you speak the Word over a situation in submission to God's authority, your voice carries the weight of heaven.", topic:"Spoken Word", correct:1, community:[70,4,5,16,5], mirrorNote:"Ephesians 2:6 says we are seated with Christ in heavenly places. The badge doesn't get its power from the officer who holds it — it gets its power from the legal system behind it. When you operate in the authority of Christ, your words carry the full weight of heaven behind them." },
      { text:"Authority in the spirit is like a muscle — it must be developed through consistent private discipline, not only activated when a crisis arrives.", topic:"Spiritual Discipline", correct:4, community:[42,4,6,43,5], mirrorNote:"A black belt doesn't develop their skill during the fight — they develop it in training sessions when nobody is watching. Jesus said of the demon-possessed boy: 'this kind only comes out through prayer and fasting.' Some authority only develops in private when nothing is happening." },
      { text:"Accountability structures in the church — small groups, spiritual covering — are optional for mature believers who have direct access to God.", topic:"Accountability", correct:2, community:[5,58,22,10,5], mirrorNote:"God's design from the beginning was against isolation: 'It is not good for man to be alone.' Accountability places you under a spiritual covering. The authority you can exercise is connected to the covering you operate within. Staying under covering is how you stay under authority." },
      { text:"Knowing your identity as a son or daughter in Christ transforms how you pray — from begging to asking from a place of relationship.", topic:"Identity", correct:4, community:[44,4,6,41,5], mirrorNote:"Pastor Wayne's son doesn't write on a cardboard box begging for food. He says 'Dad, I'm hungry.' A son asks from relationship. The sermon calls believers to shift their prayers from begging to asking as sons and daughters — not demanding, but speaking from the place of who their Father is." },
      { text:"When believers don't see breakthrough in an area, it often means they are attempting to exercise authority they haven't fully submitted to.", topic:"Authority", correct:1, community:[68,5,5,17,5], mirrorNote:"If you're not seeing breakthrough, go back and check: am I truly under authority? Obedience to what God has already told you to do is the prerequisite for commanding what He has given you authority over. The chain is: submission → carrying → commanding." },
    ],

    arguments: [
      { text:'"You cannot command what you do not carry, and you cannot carry what you\'re not connected to."', timestamp:'13:13' },
      { text:'"True power is not seized — it\'s assigned. Authority flows down from submission, not up from striving."', timestamp:'12:54' },
      { text:'"When I\'m under authority, I have authority."', timestamp:'12:23' },
      { text:'"Authority remains dormant until it\'s voiced. It\'s a command, not a request."', timestamp:'20:18' },
      { text:'"You don\'t earn authority through works. You inherit it through your seat next to Christ."', timestamp:'22:06' },
      { text:'"Stop praying about the situation — start speaking to the situation."', timestamp:'25:12' },
      { text:'"Authority is like a muscle. It must be conditioned through a lifestyle of prayer, fasting, and reading the Word."', timestamp:'29:12' },
      { text:'"You\'re not a servant. You\'re a king\'s kid. And when you understand who you are in Christ, the way you think about yourself changes."', timestamp:'22:42' },
    ],

    sortStatements: [
      { text:'"True authority is not seized by force — it flows from submission. The one who is under authority is the one who has authority."', topic:"Authority", correct:1, community:[76,3,4,12,5] },
      { text:'"Stop praying about the storm. Speak to the storm — Jesus didn\'t ask the Father to stop it, He spoke to the elements directly."', topic:"Prayer", correct:1, community:[74,4,4,13,5] },
      { text:'"You are a king\'s kid — you inherit your authority through who your Father is, not through your spiritual performance."', topic:"Identity", correct:1, community:[78,3,4,10,5] },
      { text:'"My voice carries the weight of what I\'m connected to — not who I am, but Whose I am."', topic:"Authority", correct:1, community:[75,4,4,12,5] },
      { text:'"When I\'m not submitted to God in an area, my authority is limited there — the devil will remind me of what God already told me to do."', topic:"Submission", correct:4, community:[44,5,6,40,5] },
      { text:'"Just say the word. The centurion\'s revelation was that Jesus\' authority transcends distance — it just needs to be spoken."', topic:"Faith", correct:1, community:[73,4,4,14,5] },
      { text:'"Building the storehouse means gaining spiritual strength before the crisis hits — when nobody else is watching."', topic:"Spiritual Discipline", correct:4, community:[43,5,6,41,5] },
      { text:'"When accountability feels optional, that\'s when it matters most — being under covering is what maintains the authority you have."', topic:"Accountability", correct:4, community:[44,5,7,39,5] },
    ],

    formation: [
      {
        title: "The Chain of Command",
        icon: "account_tree",
        scripture: "Matthew 8:8–9",
        verseText: "The officer said, 'Lord, I am not worthy to have you come into my home. Just say the word from where you are, and my servant will be healed. I know this because I am under the authority of my superior officers, and I have authority over my soldiers.'",
        body: "The Roman centurion's revelation was not sophisticated theology. It was military logic applied to the spiritual realm. He understood a chain of command that governs how authority actually works: the authority you exercise downward is directly tied to the authority you submit to upward. He recognized something about Jesus that the religious leaders had missed — that Jesus operated from a posture of total submission to the Father, and that this submission was the source of His power. When I'm under authority, I have authority. True power is not seized — it is assigned. You cannot command what you do not carry, and you cannot carry what you're not connected to. This is why Jesus said in John 15: 'I am the vine and you are the branches. You can do nothing apart from me.' The question the centurion's faith forces is this: is my submission to God real, or is it selective? Am I obeying what He has already told me to do while simultaneously expecting authority over what I'm praying about? The breakthrough in one area is often connected to obedience in another. What has God been telling you to do that you've been postponing?"
      },
      {
        title: "Your Voice Has Weight",
        icon: "campaign",
        scripture: "Ephesians 2:6",
        verseText: "For he raised us from the dead along with Christ and seated us with him in the heavenly realms because we are united with Christ Jesus.",
        body: "Authority remains dormant until it's voiced. Jesus didn't pray about the storm — He spoke to it: 'Peace, be still.' Paul declares in Ephesians 2:6 that believers are seated with Christ in heavenly places. This is not a future aspiration — it is a present reality. And from that position, your voice carries the weight of the authority in which it speaks. Pastor Wayne draws a critical distinction: there is a difference between praying to God about a problem and speaking to the problem under the authority of Christ. Both are valid; they are not identical. When you know who you are in Christ, your prayer language shifts from begging to asking — from 'God please do something' to 'in the name of Jesus, peace be still.' The badge doesn't get its power from the police officer who holds it. It gets its power from the entire legal and governmental system behind it. When you operate in the authority of Christ, your words carry the full weight of heaven. Speak to the situation. Call your child's name. Declare the diagnosis wrong. Not because your willpower is strong, but because of Whose you are and what position you occupy."
      },
      {
        title: "Building the Storehouse",
        icon: "fitness_center",
        scripture: "Mark 9:29",
        verseText: "He replied, 'This kind can only be cast out by prayer.'",
        body: "When the disciples couldn't cast out the demon that had tormented the boy, Jesus diagnosed the problem: this kind only comes out through prayer and fasting. The disciples had been given authority — Jesus had granted it. But there are levels of spiritual authority that only develop through consistent, private discipline. Authority is like a muscle. It must be conditioned through a lifestyle of prayer, fasting, and deep engagement with the Word — not just exercised in crisis moments. A black belt doesn't develop their strength during a fight. They develop it in training sessions when nobody is watching, when they don't feel like it, when there's no emergency to justify the investment. And when the fight comes, they're ready. This is what Pastor Wayne calls 'building the storehouse' — gaining spiritual strength before the crisis arrives so you have something to draw from when it does. What does your Tuesday look like? Your Thursday morning? The authority you want in public is conditioned in private. If you've been trying to exercise authority in a situation but aren't seeing results, the question isn't 'is God listening?' The question is: what does my private spiritual practice actually look like?"
      },
      {
        title: "You're a King's Kid",
        icon: "crown",
        scripture: "2 Samuel 9:7",
        verseText: "Don't be afraid! David said. 'I intend to show kindness to you because of my promise to your father, Jonathan. I will give you all the property that once belonged to your grandfather Saul, and you will eat here at my table!'",
        body: "Mephibosheth was hiding in a place called Lo-debar — which means 'no pasture,' a wasteland — when King David sent for him. He had every reason to expect the worst: he was the grandson of the king David had replaced, and in ancient politics, new dynasties eliminated the previous royal family. Instead, David invited him to the king's table. Not because of anything Mephibosheth had done. Not because of his ability or performance. But because of a covenant David had made with his father Jonathan — a covenant that extended to descendants. You are not a slave. You are not a servant trying to earn a seat. You are a king's kid, and you inherit your authority through your Father — through who He is and the covenant He has established through Christ. Your position at the Father's table is not something you work your way into; it is something you receive by grace, then learn to walk in. The breakthrough isn't 'if I can just do enough to earn more authority.' The breakthrough is understanding the authority you already have because of Whose table you are already seated at."
      }
    ],

    preAssessment: [
      {
        type: 'completion',
        sentence: "The centurion explained that he believed Jesus could heal from a distance because Jesus was ___ — the same reason the centurion's own orders were obeyed.",
        options: ["beloved by the Father", "well-known in the region", "under authority himself", "proven through miracles"],
        correct: 2,
        explanation: "The centurion's revelation was about how authority works in a chain of command: because he was under authority, he had authority. He recognized that Jesus, submitted to the Father, carried authority that transcended physical proximity — 'just say the word.'"
      },
      {
        type: 'completion',
        sentence: "Pastor Wayne's key principle: 'You cannot ___ what you do not carry, and you cannot carry what you're not connected to.'",
        options: ["receive", "inherit", "command", "speak"],
        correct: 2,
        explanation: "This is the architecture of authority in the kingdom: connection → carrying → commanding. When you're disconnected from the vine (John 15), you cannot carry the authority. When you cannot carry it, you cannot exercise it over the situations in your life."
      },
      {
        type: 'match',
        instruction: "Match each dimension of authority to its meaning:",
        pairs: [
          { left: "Founded on submission", right: "Being under authority is what gives you authority" },
          { left: "Activated by spoken word", right: "Authority remains dormant until it's voiced" },
          { left: "Maintained through discipline", right: "Conditioned through prayer, fasting, and the Word" },
          { left: "Inherited through identity", right: "You're a king's kid, not a servant earning a spot" }
        ],
        explanation: "These four dimensions form a complete theology of spiritual authority: its source (submission), its activation (voice), its maintenance (discipline), and its basis (identity). Weakness in any one affects the others."
      },
      {
        type: 'completion',
        sentence: "The sermon says Jesus modeled a shift from praying 'about' a problem to speaking ___ a problem.",
        options: ["for", "with", "to", "around"],
        correct: 2,
        explanation: "When the storm raged, Jesus didn't petition the Father to calm it — He spoke directly to the wind and waves: 'Peace, be still.' The sermon applies this: stop praying about the sickness or situation in petition mode, and start speaking to it as someone who carries authority in Christ."
      },
      {
        type: 'completion',
        sentence: "Mephibosheth in 2 Samuel 9 illustrates that spiritual authority in Christ is ___, not earned through personal performance.",
        options: ["given conditionally", "earned gradually", "inherited", "demonstrated publicly"],
        correct: 2,
        explanation: "Mephibosheth had nothing to offer — hiding in Lo-debar with no claim of merit. David brought him to the king's table because of the covenant with his father Jonathan. Believers receive spiritual authority through their position in Christ (Eph 2:6), not through spiritual performance."
      }
    ],

    discernmentQuestions: [
      { text:"I can walk in spiritual authority without being in spiritual submission — authority and submission are separate matters.", topic:"Authority", correct:2, community:[5,72,8,10,5], mirrorNote:"The centurion's insight was specifically that being under authority is what gives authority. 'I am a man under authority.' You cannot command what you do not carry, and you cannot carry what you're not connected to. The chain goes: submission → carrying → commanding." },
      { text:"The Roman centurion's faith amazed Jesus because he understood that Jesus' authority flowed from His submission to the Father.", topic:"Matthew 8", correct:1, community:[74,4,4,12,6], mirrorNote:"The centurion didn't just ask for healing — he explained his understanding: 'I am a man under authority.' He recognized that being submitted to a higher authority was what gave him authority over those below. He saw the same principle operating in Jesus' relationship with the Father." },
      { text:"True power in the kingdom is not seized through striving — it is assigned through relationship and covenant.", topic:"Authority", correct:1, community:[75,4,4,12,5], mirrorNote:"True power is not seized — it is assigned. This is the kingdom's operating system. The centurion didn't grab authority; he received it through the chain of command he submitted to. The same principle governs spiritual authority." },
      { text:"Speaking directly to a sickness or situation is arrogant presumption — all prayer should be addressed to God alone.", topic:"Prayer", correct:2, community:[5,65,15,10,5], mirrorNote:"Jesus spoke to the storm directly — He didn't pray to the Father to stop it. The disciples were given authority to cast out demons. Speaking to situations under the authority of Christ is not arrogance — it is exercising the delegated authority God has given believers." },
      { text:"When I'm not submitted to God in an area of my life, my authority may be limited in that area.", topic:"Submission", correct:1, community:[71,4,5,15,5], mirrorNote:"If you take off the badge, you lose the authority behind it. If you step out from under spiritual covering through disobedience, the authority you carry is affected. Connection to authority requires ongoing submission." },
      { text:"Praying about a situation and speaking to a situation are spiritually equivalent — what matters is the faith behind it.", topic:"Prayer", correct:3, community:[10,30,40,15,5], mirrorNote:"The sermon presents these as distinct, not equivalent — praying about a problem is petition; speaking to a problem is exercising delegated authority. However, sincere students may reasonably conclude that the distinction is secondary compared to the substance of faith. This is a matter of genuine theological nuance, not a simple lie." },
      { text:"Every believer — regardless of spiritual maturity or discipline — carries identical spiritual authority in Christ.", topic:"Authority", correct:3, community:[10,25,40,20,5], mirrorNote:"All believers are seated in Christ (Eph 2:6). Yet Jesus said of certain demons: 'this kind only comes out through prayer and fasting.' There appears to be a dimension of authority that is developed, not merely granted. Whether this means levels of positional authority or effective exercise of authority is a genuine theological question." },
      { text:"Accountability in the church — being under spiritual covering — is a biblical element of maintaining spiritual authority.", topic:"Accountability", correct:1, community:[73,4,5,13,5], mirrorNote:"God said from the beginning it is not good for man to be alone. Accountability places you under a spiritual covering. The authority you exercise is connected to the submission and covering you operate within." },
      { text:"My identity as a king's kid in Christ means I have authority that is inherited through covenant, not earned through works.", topic:"Identity", correct:1, community:[75,4,4,12,5], mirrorNote:"Mephibosheth received a seat at the king's table not because of his accomplishments — he was hiding in Lo-debar — but because of the covenant David made with his father. We are seated with Christ in heavenly places (Eph 2:6). That position is received, not achieved." },
      { text:"The fact that some demons 'only come out through prayer and fasting' implies there are levels of spiritual authority that develop over time.", topic:"Spiritual Discipline", correct:4, community:[44,4,6,41,5], mirrorNote:"The sermon presents this as evidence that authority must be developed. Whether 'levels' is the right framework — or whether prayer and fasting simply positions you to wield what was already given — is a theological nuance worth holding. The practical conclusion either way: private discipline matters." },
      { text:"Announcing spiritual authority publicly is more spiritually effective than exercising it in private.", topic:"Spiritual Discipline", correct:2, community:[5,68,10,12,5], mirrorNote:"Authority is built in private before it's effective in public. The black belt develops their skill in training sessions when nobody is watching. Jesus said when you fast, do it privately. Building the storehouse happens before the public moment arrives." },
      { text:"A believer's voice carries weight in the spirit proportional to their level of submission and connection to God.", topic:"Authority", correct:4, community:[44,5,5,41,5], mirrorNote:"The principle of the sermon supports this: the deeper the submission and connection, the more weight the voice carries. But quantifying this proportionality is wisdom territory — the relationship is real; the exact mechanics remain with God." },
      { text:"God is the only one who can move obstacles — a believer's role is only to pray and wait for God to act sovereignly.", topic:"Authority", correct:2, community:[5,68,10,12,5], mirrorNote:"The centurion did not ask Jesus to pray. He asked Jesus to speak the word. Jesus gave His disciples authority to cast out demons and heal the sick. God consistently acts through delegated human authority — not bypassing human action but working through it." },
      { text:"Building a consistent private life with God is preparation for the public moments of authority God will call you into.", topic:"Spiritual Discipline", correct:4, community:[44,4,6,41,5], mirrorNote:"This is the black belt principle: training in private prepares for the fight in public. This is also wisdom — private discipline that is primarily for public display misses the point. True storehouse-building is about relationship, not positioning." },
      { text:"The authority Jesus exercised was unique to His divine nature — believers today cannot operate in the same kind of spiritual authority.", topic:"Authority", correct:2, community:[5,70,10,10,5], mirrorNote:"Jesus told His disciples: 'As the Father has sent me, so I send you.' He gave them authority over all the power of the enemy. Mark 16 says these signs will follow those who believe. The authority believers carry is delegated from Christ. It is not identical to His, but it is real and substantial." }
    ],

    assessment: [
      {
        q: "What was the centurion's key revelation about how spiritual authority works?",
        options: [
          "Authority comes from military rank and personal experience",
          "Being under authority to the Father was the source of Jesus' power, and the same chain governs spiritual authority",
          "Faith alone grants unlimited authority to any believer who asks",
          "Jesus had unique divine authority that believers cannot access"
        ],
        correct: 1,
        explanation: "The centurion explained his logic: 'I am a man under authority.' He recognized that being submitted to a higher authority was what gave him authority over those below him — and saw the same principle in Jesus' relationship with the Father. Pastor Wayne's application: 'When I'm under authority, I have authority.'"
      },
      {
        q: "What key distinction does the sermon draw between praying 'about' a problem and speaking 'to' it?",
        options: [
          "Praying about problems is more humble; speaking to them can be spiritually arrogant",
          "Praying about a problem is petition; speaking to a problem is exercising the authority you carry in Christ",
          "Spoken declarations are only for mature spiritual leaders, not ordinary believers",
          "Jesus prayed to the Father about the storm before speaking to it"
        ],
        correct: 1,
        explanation: "When the storm raged, Jesus didn't ask the Father to calm it — He spoke directly to the elements: 'Peace, be still.' The sermon calls believers to the same shift: stop praying about the sickness or situation in petition mode, and start speaking to it as someone who has been given authority in Christ."
      },
      {
        q: "What does Mephibosheth's story in 2 Samuel 9 illustrate about spiritual authority?",
        options: [
          "Believers must prove their worthiness before receiving authority from God",
          "God restores those who have sinned when they confess and repent",
          "Authority in Christ is inherited through covenant position, not earned through performance",
          "Kings are uniquely authorized to represent God's authority on earth"
        ],
        correct: 2,
        explanation: "Mephibosheth had nothing to offer — hiding in Lo-debar with no claim of merit. David brought him to the king's table because of the covenant with his father Jonathan. You don't work your way into authority. You receive it through your position in Christ, seated with Him in heavenly places (Eph 2:6)."
      },
      {
        q: "What does the black belt illustration explain about how spiritual authority is maintained?",
        options: [
          "Believers who are naturally gifted operate in authority without much personal discipline",
          "Authority can only be demonstrated in public settings where others witness it",
          "Spiritual authority is developed through private, consistent discipline long before it's needed in crisis",
          "The more theological training a person has, the more authority they carry"
        ],
        correct: 2,
        explanation: "A black belt doesn't develop their skill during the fight — every training session when nobody was watching built the capacity that shows up in the moment. The disciples couldn't cast out the demon because they hadn't built the spiritual muscle (Mark 9:29). Some things in the spirit only come through private investment before the public moment arrives."
      },
      {
        q: "What does Pastor Wayne call the practice of developing spiritual strength before a crisis arrives?",
        options: [
          "Storing up merit",
          "Building the storehouse",
          "Laying the foundation",
          "Training in the wilderness"
        ],
        correct: 1,
        explanation: "Building the storehouse is gaining spiritual strength when nothing is happening so you have something to draw from when situations arise. You want a well to draw from before you're thirsty — which means digging it consistently, not only when the crisis has already hit."
      }
    ]
  },

  'outrageous-exchange': {
    id: 'outrageous-exchange',
    title: "Outrageous Exchange",
    series: 'Union Church',
    community: 'Union Church',
    date: 'Jan 26, 2026',
    type: 'Formation',
    duration: '60 min',
    scripture: 'Genesis 22:9–14',
    videoId: 'D928rXwuX64',

    preSortStatements: [
      { text:"Altitude — being elevated, successful, and visible in ministry — is a primary indicator that you are in the center of God's will.", topic:"Purpose", correct:2, community:[5,68,8,14,5], mirrorNote:"God called Abraham to a meeting place, not a mountain. Many have turned the meeting place into a mountain — 'look at how successful I am.' It was never about altitude; it was always about atmosphere. The higher you go, the lower you must remain." },
      { text:"When God slows down your momentum season, it can be His way of aligning you — not the enemy delaying you.", topic:"Alignment", correct:4, community:[42,5,6,42,5], mirrorNote:"Abraham had everything finally happening — Isaac born, momentum building — when God said 'go to Moriah.' Right in the middle of momentum, God interrupted it. Not to derail Abraham, but to align him. God will always slow you down to line you up." },
      { text:"Your gift will take you where your character can't keep you if you prioritize altitude over atmosphere.", topic:"Character", correct:4, community:[44,5,5,41,5], mirrorNote:"When you get elevated without the sacrifice — without staying low and choosing presence over platform — the nasty in you also gets elevated. Old temptations return. Your gift can take you further than your character can sustain if you skip the altar." },
      { text:"God's kingdom exchanges are always proportional — He only asks for something in line with what you can afford to give up.", topic:"Sacrifice", correct:2, community:[5,72,8,10,5], mirrorNote:"God's exchanges are outrageous, not proportional. He asked Abraham for his only son — the exact thing he waited 25 years for. The sacrifice will always cost you more than expected, but the altar will always transform you more than you can imagine." },
      { text:"A person with God's anointing can take the fastest path to their destiny without compromising the spiritual process.", topic:"Process", correct:2, community:[5,65,10,15,5], mirrorNote:"Abraham had horses — faster, more dignified. He chose a donkey. Two to three miles per hour. Some things can't be carried at speed. 'You only get promoted in the kingdom by donkey.' Jesus entered Jerusalem on a donkey. Alignment requires process, and process is often slower than acceleration." },
      { text:"There are some kingdom assignments where you cannot bring everyone who loves you — some paths are yours alone to walk.", topic:"Calling", correct:4, community:[44,5,6,40,5], mirrorNote:"Abraham told his servants: 'Stay here with the donkey.' Some people will only see a son, not a seed. Some assignments require you to go without people who love you, because they can only see what currently exists, not what God is bringing into being." },
      { text:"God wants you to surrender your 'just-in-case' — the thing you're holding back in case He doesn't come through.", topic:"Surrender", correct:1, community:[72,4,5,14,5], mirrorNote:"God doesn't want your just-in-case. He wants your one — the thing you've been keeping. He asked Abraham not for a substitute but for Isaac himself. The outrageous exchange happens when you stop holding on to your backup plan and give God your only." },
      { text:"Building an altar means working through resentment about what God is asking you to sacrifice.", topic:"Surrender", correct:2, community:[5,75,5,10,5], mirrorNote:"Abraham didn't build a case. He built an altar. He didn't build up resentment. He built an altar. He didn't build an audience to tell him why he shouldn't do it. He built an altar. The altar is the opposite of resentment — it is the place where surrender becomes worship." },
    ],

    arguments: [
      { text:'"The sacrifice will always cost you more than expected, but the altar will always transform you more than you can imagine."', timestamp:'10:46' },
      { text:'"It was never about altitude. It was always about atmosphere — about staying in the presence."', timestamp:'26:39' },
      { text:'"The higher you go, the lower you have to remain."', timestamp:'27:00' },
      { text:'"God will always slow you down to line you up."', timestamp:'31:10' },
      { text:'"You only get promoted in the kingdom by donkey."', timestamp:'34:14' },
      { text:'"There are some assignments where nobody can go with you."', timestamp:'40:15' },
      { text:'"God never asks for anything He doesn\'t plan to fill."', timestamp:'14:30' },
      { text:'"Abraham didn\'t build a case. He didn\'t build resentment. He built an altar."', timestamp:'52:04' },
    ],

    sortStatements: [
      { text:'"The sacrifice will always cost you more than expected, but the altar will always transform you more than you can imagine."', topic:"Sacrifice", correct:1, community:[76,3,4,12,5] },
      { text:'"It was never about altitude — it was always about atmosphere. Are you climbing for a platform or a meeting place?"', topic:"Purpose", correct:1, community:[74,4,4,13,5] },
      { text:'"God will always slow you down to line you up — slow is not the enemy\'s stall, it\'s God\'s alignment."', topic:"Alignment", correct:4, community:[44,5,5,41,5] },
      { text:'"You only get promoted in the kingdom by donkey — put the horses away and embrace the process."', topic:"Process", correct:4, community:[43,5,5,42,5] },
      { text:'"There are some assignments where nobody can go with you — not because they don\'t love you, but because they only see a son, not a seed."', topic:"Calling", correct:4, community:[42,5,6,42,5] },
      { text:'"God never asks for anything He doesn\'t plan to fill — the outrageous exchange is always in your favor."', topic:"Trust", correct:1, community:[75,4,4,12,5] },
      { text:'"Abraham didn\'t build a case. He didn\'t build resentment. He didn\'t build an audience. He built an altar."', topic:"Surrender", correct:1, community:[76,3,4,12,5] },
      { text:'"When you make an altar, you can leave declaring: Yahweh Yireh — the Lord has already provided."', topic:"Yahweh Yireh", correct:1, community:[77,3,4,11,5] },
    ],

    formation: [
      {
        title: "Exchange Altitude for Atmosphere",
        icon: "keyboard_double_arrow_down",
        scripture: "Genesis 22:2",
        verseText: "Take your son, your only son — yes, Isaac, whom you love so much — and go to the land of Moriah. Go and sacrifice him as a burnt offering on one of the mountains, which I will show you.",
        body: "God did not call Abraham to a mountain. He called him to a meeting place. In the geography of Scripture, Moriah is where the temple would eventually stand, where the presence of God would dwell among His people. It was never arbitrary terrain; it was always about encounter. But a pervasive spiritual disease of the current age is this: we have sacrificed atmospheres for altitudes. We have turned meeting places into mountains — platforms to demonstrate how high we've risen rather than altars where we bow low in His presence. The pursuit of altitude — visibility, success, being seen — is not wrong in itself. God takes people to high places. But there is a difference between a mountain you climb to be seen and a mountain you climb to surrender. Abraham didn't plant a flag. He built an altar. He didn't raise a platform. He raised a knife. A man is not measured by how tall he stands after he falls, but rather how low he remains after he stands. When you prioritize altitude over atmosphere, your gift will take you further than your character can sustain — old temptations surface, the nasty in you gets elevated alongside your status. If it took the presence to get you up the mountain, it's going to take the presence to keep you there. The question is not how high you are climbing. The question is whether you're climbing toward a meeting place or a monument."
      },
      {
        title: "Exchange Acceleration for Alignment",
        icon: "directions_bike",
        scripture: "Proverbs 3:5–6",
        verseText: "Trust in the Lord with all your heart; do not depend on your own understanding. Seek his will in all you do, and he will show you which path to take.",
        body: "Abraham was rich. He had horses. He could have gotten to Moriah fast. He chose a donkey — two to three miles per hour, carrying the weight of the most painful assignment of his life. This is not incidental. There is a category of spiritual breakthrough that cannot be carried at speed. Acceleration makes you impressive; alignment makes you trustworthy. Everyone wants to go zero to sixty. But God is often not asking to accelerate you — He is asking to align you. He interrupts your momentum not because He is against your progress, but because something in you still needs the donkey's pace to develop properly. Anxiety is the inability to slow your thoughts down — worrying about something that only alignment takes care of. David was anointed in the mail room and went right back to tending sheep. The promise had come, but the donkey was still the mode of travel. Your character must be developed enough to carry what your gift has secured. If promotion comes before alignment, the nasty in you gets elevated too. Some prayers aren't answered at the speed you want because God is taking you by donkey — slow, low, aligned. Don't neglect your donkey mission. Put the horses away."
      },
      {
        title: "Exchange Audiences for Assignments",
        icon: "person_remove",
        scripture: "Genesis 22:5–6",
        verseText: "Abraham told the servants, 'Stay here with the donkey while the boy and I go over there. We will worship there, and then we will come right back.' So Abraham placed the wood for a burnt offering on Isaac's shoulders while he himself carried the fire and the knife. As the two of them walked on together...",
        body: "There is a detail in Genesis 22 that goes unnoticed on first reading: Abraham tells the servants to stay behind. Sarah is absent from this moment — and the sermon suggests a reason: some people can only see a son. Abraham saw a seed. When you are carrying a kingdom assignment that requires sacrifice at an unprecedented level, not everyone in your life will be equipped to accompany you. This is not disloyalty — it is the nature of certain calls. There are some assignments where nobody can go with you. Not because they don't love you, but because they will only see what currently exists, not what God is bringing into being. Some things that have been holding you back — the relationship, the old job, the number in your phone — must be left behind not because they are evil but because they cannot carry what God is asking you to lay down. There is always a counterfeit before the real thing arrives. And sometimes God asks you to stop holding on to your just-in-case so that He can give you what you've actually been believing for. God wants to make you many. But many always starts with releasing your one."
      },
      {
        title: "Exchange Altars for Announcements",
        icon: "campaign",
        scripture: "Genesis 22:14",
        verseText: "Abraham named the place Yahweh-Yireh (which means 'the Lord will provide'). To this day, people still use that name as a proverb: 'On the mountain of the Lord it will be provided.'",
        body: "After Abraham laid Isaac on the altar and lifted the knife, an angel stopped him. He looked behind him and saw a ram caught in the thicket — already there before he started his ascent. The ram's horn specifically — the shofar — was left after the offering. This was the horn that would announce war. The horn blown in the year of Jubilee. The horn blown when entering God's presence. And Abraham named the place Yahweh Yireh — the Lord has provided. This is the final exchange: every altar becomes an announcement. When you lay down what is precious, what you've waited years for, what costs more than you thought it would — the altar does not end in loss. It ends in a declaration. Now look back over your shoulder. There is something caught in the thicket of your past — a victory you didn't fully praise God for, a provision you passed without noticing, a moment He came through when the odds were impossible. The praise is caught in your pain, waiting to be released. God never asks for anything He doesn't plan to fill. If He is asking for it, He has already prepared what comes after. When you walk away from the altar, you walk away with a new name for the place: Yahweh Yireh — the Lord has provided, and He will provide again."
      }
    ],

    preAssessment: [
      {
        type: 'completion',
        sentence: "God called Abraham to Moriah not to give him a mountain to stand on, but to give him a ___.",
        options: ["platform", "test of endurance", "meeting place", "reward for obedience"],
        correct: 2,
        explanation: "The sermon's first exchange corrects a common misreading: Moriah was a meeting place — where the presence of God would eventually dwell in the temple. God was never calling Abraham to altitude; He was calling him to atmosphere. The mountain was always about encounter, not elevation."
      },
      {
        type: 'completion',
        sentence: "Pastor Jimmy says Abraham chose a donkey instead of horses because some things in the kingdom can only be carried ___.",
        options: ["by others on your behalf", "with great visible faith", "slowly", "at night in secret"],
        correct: 2,
        explanation: "Abraham had horses — faster and more dignified. He chose a donkey. Two to three miles per hour with the weight of his greatest sacrifice. Alignment requires slowness. God interrupts momentum not to derail you, but to align you. Some breakthroughs can only be carried at donkey pace."
      },
      {
        type: 'match',
        instruction: "Match each outrageous exchange to what is surrendered and what is received:",
        pairs: [
          { left: "Altitude for atmosphere", right: "Give up the platform; receive the presence" },
          { left: "Acceleration for alignment", right: "Give up speed; receive trustworthy character" },
          { left: "Audiences for assignments", right: "Give up people-pleasing; receive your specific call" },
          { left: "Altars for announcements", right: "Give up what you're holding; receive Yahweh Yireh" }
        ],
        explanation: "Each exchange costs something real — and each return is greater than what was offered. The outrageous part is not that God takes. The outrageous part is what God gives back."
      },
      {
        type: 'completion',
        sentence: "When Abraham told his servants to stay behind, it was because some assignments require going without those who can only see ___, not the seed.",
        options: ["the promise", "the mountain", "the son", "the sacrifice"],
        correct: 2,
        explanation: "The sermon suggests Sarah isn't in the story because all she could see was Isaac — a son. Abraham saw a seed that would become many nations. Some people who love you deeply will only see what currently exists; they cannot see what God is about to create through your sacrifice."
      },
      {
        type: 'completion',
        sentence: "Abraham named the place Yahweh Yireh after discovering that what he needed was already ___.",
        options: ["promised before creation", "earned by his faithfulness", "there — caught in the thicket", "given at the very last moment"],
        correct: 2,
        explanation: "The ram was already caught in the thicket before Abraham completed his ascent — the provision in place before the test was finished. Yahweh Yireh means 'the Lord will provide,' and in this case the provision was already there. God never asks for anything He doesn't plan to fill."
      }
    ],

    discernmentQuestions: [
      { text:"Success, elevation, and visibility in ministry are primary indicators that you are in the center of God's will.", topic:"Purpose", correct:2, community:[5,68,8,14,5], mirrorNote:"God called Abraham not to a mountain of visibility but to a meeting place. The first exchange is trading the pursuit of altitude for the cultivation of atmosphere. Visible success can accompany faithfulness — but it can never be the measure of it. Abraham climbed to surrender, not to be seen." },
      { text:"God can interrupt your best momentum season not to stall you but to align you for something greater.", topic:"Alignment", correct:4, community:[44,5,5,41,5], mirrorNote:"Abraham had Isaac — momentum at last. Then God said 'go to Moriah.' Right in the middle of his best season, God interrupted it. The sermon presents this as alignment, not delay. But not every interruption is God — discernment is required to distinguish divine alignment from enemy attack or natural circumstance." },
      { text:"Abraham's choice to travel by donkey instead of horse illustrates that God values character alignment over rapid achievement.", topic:"Process", correct:4, community:[44,5,5,41,5], mirrorNote:"The donkey was deliberate — slow, low, aligned. Acceleration makes you impressive; alignment makes you trustworthy. The promotion in the kingdom comes by donkey. This is the sermon's principle; the broader wisdom is that God cares more about who you're becoming than how fast you arrive." },
      { text:"God's kingdom exchanges are always fair — He asks for something proportional to what He gives you in return.", topic:"Sacrifice", correct:2, community:[5,72,8,10,5], mirrorNote:"The exchanges in the kingdom are outrageous, not proportional. God asked for the only son Abraham had waited 25 years for. He exchanged Jesus' innocence for humanity's guilt. The transaction always feels unfair going in — and incomprehensibly generous coming out. That's what makes it outrageous." },
      { text:"Familiarity is the kryptonite to faith — once faith produces something, it takes faith to maintain it and not become comfortable.", topic:"Faith", correct:1, community:[75,4,4,12,5], mirrorNote:"'If faith produced it, it takes faith to keep it.' This is a direct statement from the sermon. Don't get comfortable. Wake up every day saying 'God, show me something.' The thief of faith is becoming familiar with what God has already done." },
      { text:"Your gift will take you where your character can't keep you if you prioritize altitude over atmosphere.", topic:"Character", correct:1, community:[74,4,4,13,5], mirrorNote:"When you get elevated without sacrifice — without choosing presence over platform — the nasty in you gets elevated too. Unresolved pride, old temptations, character gaps surface when success comes before alignment. The gift opens the door; the character determines whether you stay in the room." },
      { text:"When a kingdom assignment requires going up the mountain, everyone who loves you should be part of the journey.", topic:"Calling", correct:2, community:[5,68,10,12,5], mirrorNote:"Abraham told his servants: 'Stay here.' Sarah isn't in the story. Some assignments can only be completed by those who can see the seed, not just the son. Not everyone who loves you can go with you — not because they're disloyal, but because the assignment is specifically yours to carry." },
      { text:"Anxiety is the inability to slow your thoughts down, and only alignment — not acceleration — can address it.", topic:"Alignment", correct:4, community:[42,5,7,41,5], mirrorNote:"The sermon names this specifically: anxiety is the inability to slow your thoughts down — worrying about something that only alignment takes care of. The donkey pace is not just logistical; it's spiritual. Whether alignment is the only remedy for anxiety is overstated — but the principle that rushing makes it worse is sound." },
      { text:"Abraham's exchange at Moriah was purely personal — the impact was only for him and his immediate family.", topic:"Genesis 22", correct:2, community:[5,74,5,11,5], mirrorNote:"The sermon opens with 'Father Abraham had many sons' — Abraham's surrender on Moriah became the foundation for a covenant that encompasses every believer. 'The reality of many always starts with the release of one.' The altar Isaac was laid on was the most generationally consequential act of Abraham's life." },
      { text:"God's outrageous exchanges start with Him asking for your 'one' in order to make you 'many.'", topic:"Kingdom", correct:1, community:[74,4,4,13,5], mirrorNote:"'The reality of many always starts with the release of one.' God asked for Abraham's only son. He asked Moses to leave Pharaoh's palace. He asked the woman to give her last jar of oil. The pattern is consistent: offer your one, receive your many. This is the kingdom's operating logic." },
      { text:"When you build an altar, the right expectation is to get back exactly what you put in.", topic:"Surrender", correct:2, community:[5,72,8,10,5], mirrorNote:"In the kingdom, you don't get back a teddy bear — you get back freedom, forgiveness, purpose, multiplication. You don't exchange your one to receive your one back unchanged. You exchange your one to receive many. The altar transforms; it doesn't merely return." },
      { text:"Isaac was the promise God made to Abraham — not a gift to get to a deeper promise.", topic:"Genesis 22", correct:2, community:[5,70,10,10,5], mirrorNote:"'Isaac was never the promise. Isaac was the gift to get to the promise.' Sarah could only see a son; Abraham saw a seed that would become nations. What God has already given you is not your final destination — it is often the vehicle to a greater covenant reality." },
      { text:"Once you lay something on the altar, it is permanently lost — the exchange is a one-way surrender.", topic:"Surrender", correct:2, community:[5,74,5,11,5], mirrorNote:"The ram was already caught in the thicket. The angel stopped Abraham. Isaac came back down the mountain with him. The outrageous exchange is not permanent loss — it is transformation. What you surrender is replaced by something greater: Yahweh Yireh, the announcement that God has already provided." },
      { text:"The provision God has prepared for your situation is often already in place before you finish the act of surrender.", topic:"Providence", correct:1, community:[74,4,4,13,5], mirrorNote:"The ram was caught in the thicket on the way up the mountain — before Abraham reached the altar. The provision was already there. God never asks for anything He doesn't plan to fill. This does not mean the provision is visible before the surrender — it means it is in place, caught and waiting, before the act is complete." },
      { text:"Holding on to your 'just-in-case' backup plan is the same as exercising good stewardship of what God has given you.", topic:"Surrender", correct:2, community:[5,70,10,10,5], mirrorNote:"The sermon distinguishes clearly: God doesn't want your just-in-case. He wants your one. The just-in-case represents what you're keeping in reserve — in case God doesn't come through. That is not stewardship; that is divided trust. Full surrender means releasing even the contingency plan." }
    ],

    assessment: [
      {
        q: "What is the first outrageous exchange the sermon calls believers to make?",
        options: [
          "Exchange suffering for success through persistent faith",
          "Exchange altitude for atmosphere — give up the platform to prioritize the presence of God",
          "Exchange old habits for new spiritual disciplines",
          "Exchange your current assignment for a larger ministry calling"
        ],
        correct: 1,
        explanation: "God called Abraham not to a visible mountain but to a meeting place. The first exchange is trading the pursuit of altitude — success, elevation, being seen — for the cultivation of atmosphere: the presence of God. Abraham didn't plant a flag; he built an altar. A man is not measured by how tall he stands after he falls, but how low he remains after he stands."
      },
      {
        q: "What does Abraham's choice to ride a donkey instead of a horse represent in the sermon?",
        options: [
          "Abraham's limited financial resources at this point in his life",
          "His desire to travel in public humility before those on the road",
          "The exchange of acceleration for alignment — going slow to stay aligned with God's pace",
          "A sign of mourning for the sacrifice he was about to offer"
        ],
        correct: 2,
        explanation: "Abraham was rich and had horses. He chose a donkey — two to three miles per hour. Some things can only be carried at donkey pace. God interrupts momentum to align, not to delay. Acceleration makes you impressive; alignment makes you trustworthy. You only get promoted in the kingdom by donkey."
      },
      {
        q: "Why weren't the servants — or Sarah — brought up the mountain with Abraham?",
        options: [
          "They were spiritually unworthy for the sacred nature of the assignment",
          "Abraham didn't trust them with the details of what God had asked him to do",
          "Some assignments can only be walked with those who see the seed — some people can only see what currently is, not what God is creating",
          "God specifically required that worship at the altar be done in complete isolation"
        ],
        correct: 2,
        explanation: "The sermon suggests Sarah could only see a son — the promise she had waited for. Abraham saw a seed: nations. When you carry a kingdom assignment that requires unprecedented sacrifice, some who love you can only see what currently exists, not what God is creating through your surrender. Some paths are specifically yours to walk."
      },
      {
        q: "What does Yahweh Yireh mean, and what does it announce?",
        options: [
          "The Lord is here — declaring God's immediate presence in the crisis",
          "The Lord has provided — declaring that every altar becomes an announcement of God's faithfulness",
          "The Lord is my sacrifice — marking Abraham's complete act of surrender",
          "The Lord sees — acknowledging that God witnessed Abraham's obedience"
        ],
        correct: 1,
        explanation: "Yahweh Yireh means 'the Lord will provide.' Abraham named the place this after discovering the ram — provision already caught in the thicket before the ascent was complete. Every altar a believer builds becomes an announcement: the Lord has provided. And that announcement reverberates forward and backward in your story."
      },
      {
        q: "What is the 'caught praise' Pastor Jimmy says is behind every believer?",
        options: [
          "Worship songs that were cut short in a past service and need to be completed",
          "Praise stuck in the pain and disappointment of the past — provisions and victories not yet fully celebrated",
          "A prophetic song God is calling you to write as an act of personal surrender",
          "The applause of heaven that arrives at the exact moment of full surrender"
        ],
        correct: 1,
        explanation: "The ram was already caught in the thicket — caught before Abraham got there. Look over your shoulder. There is something caught in your past — a time God came through, a provision that felt too small to fully acknowledge, a victory you passed without complete praise. The altar doesn't end in loss; it ends in an announcement. And the announcement is already there, caught and waiting."
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
      { text:"Seeking God is primarily about mastering the right spiritual disciplines in the correct order.", topic:"Spiritual Formation", correct:2, community:[14,52,6,18,10], mirrorNote:"Seeking God has no regimented pattern — it is, first and fundamentally, a matter of your quest for God. The issue is not technique. It is hunger. Reducing seeking to a formula is the precise thing the sermon argues against." },
      { text:"You can have genuine love for God without necessarily developing knowledge of how He operates in the spiritual realm.", topic:"Spiritual Knowledge", correct:2, community:[12,55,8,18,7], mirrorNote:"You cannot sustain a real relationship with what you have no knowledge of. Hosea 4:6 warns that God's people are destroyed for lack of knowledge — not for lack of sincerity. Sincerity without knowledge cannot navigate a world where invisible forces have visible consequences." },
      { text:"Prayer is most effective when a believer clearly articulates their needs and petitions to God.", topic:"Prayer", correct:4, community:[30,5,6,52,7], mirrorNote:"Prayer is not informing God of what He doesn't know. Prayer is the believer cooperating with heaven to actualize what God has already purposed on earth. Articulating needs is not wrong — but that is not what makes prayer effective." },
      { text:"True saving faith anchors you to what God has said regardless of what your circumstances appear to communicate.", topic:"Faith", correct:1, community:[76,3,4,12,5], mirrorNote:"Sovereign faith is becoming scarce in our generation — a faith that holds its ground when what you see contradicts what you believe. This statement captures exactly what the sermon calls sovereign faith." },
      { text:"A person who does not feel ready for a calling is most likely not called to it.", topic:"Preparation", correct:2, community:[8,60,6,18,8], mirrorNote:"Every man God used significantly was processed in obscurity before he was displayed in impact. The season of hiddenness is not punishment — it is sacred investment. Moses did not feel ready at the burning bush." },
      { text:"Personal consecration and holiness determine the depth of a believer's access to God.", topic:"Consecration", correct:1, community:[72,4,5,14,5], mirrorNote:"To seek God authentically is to reckon that without Him you are undone. That reckoning — the honest acknowledgment of dependence — is what consecration produces. It is not a performance; it is a posture." },
      { text:"Seeking God will always produce the same predictable emotional experience — peace, warmth, or a felt sense of His presence.", topic:"Seeking God", correct:5, community:[10,22,7,15,46], mirrorNote:"Seeking God has no regimented pattern. God is not contained in a predictable emotional signature. Demanding a particular feeling as proof of encounter is a malformed expectation that the sermon's entire argument dismantles." },
      { text:"A believer who hungers for God more than they hunger for results will always find Him.", topic:"Seeking God", correct:1, community:[78,3,4,10,5], mirrorNote:"Seeking God is, first and fundamentally, a matter of your quest for God. Jeremiah 29:13 says 'when you seek me with all your heart.' Hunger for God Himself — not His benefits — is precisely the posture the sermon calls the true way of seeking." },
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

    preAssessment: [
      {
        type: 'completion',
        sentence: "Seeking God has no regimented pattern — it is first and fundamentally a matter of your ___ for God.",
        options: ["theology", "quest", "discipline", "performance"],
        correct: 1,
        explanation: "Jeremiah 29:13 — 'when you seek me with all your heart.' God is not evaluating the sophistication of your method. He is responding to the wholeness of your desire. The question is not 'Am I doing this right?' but 'Is my hunger real?'"
      },
      {
        type: 'completion',
        sentence: "You cannot sustain a real relationship with what you have no ___ of.",
        options: ["experience", "feelings", "knowledge", "desire"],
        correct: 2,
        explanation: "Hosea 4:6 — 'My people are destroyed for lack of knowledge.' Sincerity toward God is not enough to sustain a relationship. Love requires knowledge — knowing how He moves, how He operates, and how the spiritual realm functions."
      },
      {
        type: 'match',
        instruction: "Match each concept to how the sermon defines it:",
        pairs: [
          { left: "Seeking God", right: "A quest driven by hunger, not a formula driven by method" },
          { left: "Prayer", right: "Heaven-earth partnership — actualizing what God has already purposed" },
          { left: "Sovereign faith", right: "Holding convictions when circumstances contradict what you believe" },
          { left: "The hidden season", right: "Sacred investment in character before public impact" }
        ],
        explanation: "Each of these redefinitions dismantles a surface-level assumption. Seeking is not technique; prayer is not petition; faith is not comfort; hiddenness is not waste."
      },
      {
        type: 'completion',
        sentence: "Prayer is not informing God of what He doesn't know — it is the believer ___ with heaven to actualize what God has already purposed on earth.",
        options: ["arguing", "pleading", "cooperating", "negotiating"],
        correct: 2,
        explanation: "Matthew 6:10 — 'Your kingdom come, your will be done, on earth as it is in heaven.' The believer is not initiating something God was waiting to be convinced of. Prayer is the mechanism of alignment, not of persuasion."
      },
      {
        type: 'completion',
        sentence: "God deliberately processes significant believers in seasons of ___ before displaying them in impact.",
        options: ["ministry", "visible success", "obscurity", "fellowship"],
        correct: 2,
        explanation: "Moses had 40 years in the wilderness before the burning bush. David was anointed king and spent years running from Saul. Jesus Himself had 30 years of obscurity before 3 years of ministry. The hidden season is not wasted time — it is sacred investment."
      }
    ],

    discernmentQuestions: [
      { text:"Seeking God is primarily about mastering the right spiritual disciplines in the correct order.", topic:"Spiritual Formation", correct:2, community:[14,52,6,18,10], mirrorNote:"Seeking God has no regimented pattern — it is a matter of your quest for God. The issue is not technique. It is hunger. Reducing seeking to a formula is the precise thing this sermon argues against." },
      { text:"A believer's genuine love for God can coexist with deep ignorance of how God operates in the spiritual realm.", topic:"Spiritual Knowledge", correct:2, community:[12,55,8,18,7], mirrorNote:"You cannot sustain a real relationship with what you have no knowledge of. Hosea 4:6 warns that God's people are destroyed for lack of knowledge — not for lack of sincerity. Sincerity without knowledge cannot navigate a world where invisible forces have visible consequences." },
      { text:"A believer who feels God's presence consistently is seeking Him more effectively than one who doesn't feel anything.", topic:"Seeking God", correct:5, community:[10,24,7,15,44], mirrorNote:"Seeking God has no regimented pattern — God is not contained in a predictable emotional signature. Demanding a felt presence as proof of encounter misunderstands what seeking is. This is a malformed standard for measuring effectiveness." },
      { text:"Prayer is most powerful when a believer clearly and specifically articulates their personal needs to God.", topic:"Prayer", correct:4, community:[30,5,6,52,7], mirrorNote:"Prayer is not informing God of what He doesn't know. Prayer is the believer cooperating with heaven to actualize what God has already purposed on earth. Articulation is not wrong — but that is not what makes prayer effective. This is a matter of wisdom." },
      { text:"Sovereign faith holds its convictions even when life circumstances appear to contradict what God has said.", topic:"Faith", correct:1, community:[76,3,4,12,5], mirrorNote:"This is the sermon's definition. Sovereign faith is becoming scarce in a generation that recalibrates belief based on visible outcomes. This is the faith that holds its ground when what you see contradicts what you believe." },
      { text:"The quality of a believer's spiritual life can be accurately measured by the consistency of their devotional schedule.", topic:"Spiritual Formation", correct:5, community:[8,28,8,18,38], mirrorNote:"The issue is not technique or consistency of schedule — it is the wholeness of desire behind it. A consistent schedule maintained without genuine hunger is exactly what this sermon dismantles. This is a malformed standard." },
      { text:"God processes believers in seasons of hiddenness and obscurity before elevating them to significant public impact.", topic:"Preparation", correct:1, community:[72,4,5,14,5], mirrorNote:"Moses, David, Jesus Himself — all had extended seasons of obscurity before public impact. God uses the hidden season to build character, not platform. Character formed in hiddenness is what determines whether the platform will produce fruit." },
      { text:"A believer who is not yet seeing visible results from their ministry or calling is probably not in God's will.", topic:"Preparation", correct:2, community:[5,70,6,14,5], mirrorNote:"The season of hiddenness is not evidence of wrong direction — it is often evidence of right preparation. The hidden season is sacred investment, not divine rejection." },
      { text:"Prayer that doesn't feel effective is probably not working.", topic:"Prayer", correct:5, community:[7,32,8,15,38], mirrorNote:"Prayer is not informing God — it is the believer cooperating with heaven's already-moving purposes. Whether prayer 'feels effective' is not the standard. The question is whether the believer is aligned with what God has already purposed. This is a malformed standard." },
      { text:"A believer who hungers for God Himself — above results, comfort, or relief — will find Him.", topic:"Seeking God", correct:1, community:[78,3,4,10,5], mirrorNote:"Jeremiah 29:13 — 'when you seek me with all your heart.' Hunger for God Himself, not His benefits, is the posture the sermon identifies as the true way of seeking." },
      { text:"God's pattern for preparing people for impact always involves a season where almost nothing visible seems to be happening.", topic:"Preparation", correct:1, community:[71,4,5,14,6], mirrorNote:"Moses 40 years in Midian. David anointed then hunted. Jesus 30 years in Nazareth. The pattern is consistent. The season that looks like nothing is happening is often where everything necessary is being built." },
      { text:"Spiritual knowledge — understanding how God and the spiritual realm operate — is a secondary concern compared to love and devotion.", topic:"Spiritual Knowledge", correct:2, community:[10,60,6,16,8], mirrorNote:"Hosea 4:6 treats lack of knowledge as the source of destruction, not lack of love. You can love God deeply and still be destroyed by ignorance of how He operates. Knowledge and devotion are not substitutes for one another." },
      { text:"Perseverance through a season of hiddenness, with no visible result, is itself an act of faith.", topic:"Faith", correct:1, community:[73,4,4,14,5], mirrorNote:"Hebrews 11 is full of people who acted on what they believed without seeing the result. The hidden season requires exactly this kind of faith — not faith that produces visible results, but faith that holds its ground while nothing visible confirms it." },
      { text:"God's delay in answering prayer most likely indicates that He is waiting for the believer to pray with more faith.", topic:"Prayer", correct:5, community:[8,30,6,14,42], mirrorNote:"God's delay is not a feedback signal about the quality of your prayer. The season of hiddenness is about formation, not about the believer earning a response through better technique. This turns prayer into a performance metric. The question is malformed." },
      { text:"True seeking of God produces a transformation in who you are, not just access to what you want.", topic:"Seeking God", correct:1, community:[76,3,4,12,5], mirrorNote:"Seeking God is a quest that fundamentally transforms who you are. The sermon argues that the person who has genuinely sought God is a different person than the one who went through the motions — not just a more satisfied one." }
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
      { text:"The demonic realm is organized into ranks and hierarchies specifically assigned to resist the purposes of God.", topic:"Spiritual Warfare", correct:1, community:[72,3,4,16,5], mirrorNote:"Satan's kingdom is not disorganized chaos. Principalities, powers, rulers of darkness, spiritual wickedness in high places — these are ranks. This is a military structure deployed against the advancement of God's kingdom." },
      { text:"A believer's struggles are primarily social and psychological — prayer matters but the real battles happen in the natural realm.", topic:"Spiritual Warfare", correct:2, community:[4,72,6,12,6], mirrorNote:"Our warfare is not against flesh and blood — and until you settle that conviction in your mind, you will always be fighting the wrong enemy. Ephesians 6:12 names four tiers of spiritual opposition. Reducing the battle to the social is precisely the lie Paul corrects." },
      { text:"Ignorance of how the enemy operates is one of the primary reasons believers live below their God-given authority.", topic:"Spiritual Warfare", correct:1, community:[75,3,4,13,5], mirrorNote:"Two ignorances rob believers of their authority: ignorance of the enemy's devices, and ignorance of how to conduct spiritual warfare. Together, they produce a believer who was designed to win but lives as though they are losing." },
      { text:"Only specially anointed leaders — apostles and prophets — are equipped to engage in serious spiritual warfare.", topic:"Spiritual Authority", correct:2, community:[5,70,6,15,4], mirrorNote:"Consecration, not title, is what qualifies a believer to engage in warfare. The sons of Sceva had a title — they lost badly. Every consecrated believer carries the authority of the One in whose name they stand." },
      { text:"Personal consecration is a prerequisite for effective spiritual warfare — an unholy life cannot carry genuine spiritual authority.", topic:"Consecration", correct:1, community:[74,3,4,14,5], mirrorNote:"The believer who is not consecrated has no business going into battle. Consecration is not a spiritual luxury — it is your credential in the war. Acts 19 shows what happens when someone tries to exercise spiritual authority without it." },
      { text:"Nations and territories are spiritually contested — there are demonic forces assigned to resist the gospel's advance in specific regions.", topic:"Territorial Warfare", correct:1, community:[68,4,5,17,6], mirrorNote:"Nations are not casually evangelized. Every territory on this earth is supernaturally contested. You do not waltz into a city and reap the harvest without confronting what has been assigned there to resist you." },
      { text:"If a believer consistently faces spiritual difficulty, it most likely means they have committed a sin that is blocking God's blessing.", topic:"Suffering", correct:5, community:[7,28,5,10,50], mirrorNote:"Spiritual difficulty may reflect the enemy's targeted resistance — especially when a believer is advancing God's kingdom. The question 'what sin caused this?' is often the wrong place to start. Two ignorances rob believers of their authority." },
      { text:"Spiritual warfare is mainly about speaking loudly in prayer — volume and persistence are the primary factors.", topic:"Prayer", correct:5, community:[5,30,8,12,45], mirrorNote:"Volume is not the credential. Holiness is. The sons of Sceva were loud — they lost badly. Acts 19 shows that the enemy responds not to noise but to the authority of a life aligned with Christ." },
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

    preAssessment: [
      {
        type: 'completion',
        sentence: "Ephesians 6:12 says our warfare is not against flesh and blood, but against rulers, authorities, and spiritual forces of evil in ___ realms.",
        options: ["earthly", "heavenly", "natural", "hidden"],
        correct: 1,
        explanation: "Paul uses four distinct terms — rulers, authorities, powers of this dark world, spiritual forces of evil in heavenly realms — each describing a different tier in a deliberate hierarchy. Spiritual opposition is organized, not chaotic."
      },
      {
        type: 'completion',
        sentence: "Two ___ rob believers of their authority: not knowing how the enemy operates, and not knowing how to conduct spiritual warfare.",
        options: ["sins", "fears", "ignorances", "mistakes"],
        correct: 2,
        explanation: "2 Corinthians 2:11 says Paul was not ignorant of Satan's schemes — implying that ignorance is a choice. Together, these two knowledge gaps produce believers designed to win who live as though they are losing."
      },
      {
        type: 'match',
        instruction: "Match each concept to what the sermon reveals about it:",
        pairs: [
          { left: "The sons of Sceva", right: "Spiritual authority invoked without a consecrated life behind it" },
          { left: "Ephesians 6:12", right: "Four distinct ranks of organized demonic opposition" },
          { left: "Consecration", right: "The credential that makes spiritual authority credible" },
          { left: "Territorial spirits", right: "Demonic forces assigned to resist the gospel in specific regions" }
        ],
        explanation: "These four concepts define the theology of the sermon. The central insight: authority in the spiritual realm is backed by a life aligned with Christ, not merely claimed by title."
      },
      {
        type: 'completion',
        sentence: "The believer who is not ___ has no business going into battle — it is the credential that makes the invocation credible.",
        options: ["gifted", "educated", "consecrated", "trained"],
        correct: 2,
        explanation: "Acts 19 — the sons of Sceva invoked authority they didn't carry. The demonic response: 'Jesus I know, Paul I know — but who are you?' The lesson is not about volume or title. It is about the life behind the prayer."
      },
      {
        type: 'completion',
        sentence: "Nations are not casually evangelized — every ___ on earth is supernaturally contested.",
        options: ["church", "city", "territory", "believer"],
        correct: 2,
        explanation: "Psalm 2:8 — 'Ask me, and I will make the nations your inheritance.' The nations must be actively taken in partnership with God. 1 Corinthians 15:32 shows Paul fighting 'wild beasts' in Ephesus — organized spiritual resistance encountered advancing the gospel."
      }
    ],

    discernmentQuestions: [
      { text:"The demonic realm is organized into ranks and hierarchies deliberately assigned to resist God's kingdom.", topic:"Spiritual Warfare", correct:1, community:[72,3,4,16,5], mirrorNote:"Satan's kingdom is not disorganized chaos. Principalities, powers, rulers of darkness, spiritual wickedness in high places — these are ranks. This is a military structure deployed against the advancement of God's kingdom." },
      { text:"A believer's primary battles in daily life are ultimately social and psychological, with the spiritual realm playing a secondary role.", topic:"Spiritual Warfare", correct:2, community:[4,72,6,12,6], mirrorNote:"Our warfare is not against flesh and blood — and until you settle that conviction, you will always be fighting the wrong enemy. Ephesians 6:12 names four tiers of spiritual opposition. Reducing the battle to the social is the lie Paul corrects." },
      { text:"Only apostles and prophets with special anointing are equipped to engage in serious spiritual warfare.", topic:"Spiritual Authority", correct:2, community:[5,70,6,15,4], mirrorNote:"Consecration, not title, is what qualifies a believer to engage in warfare. The sons of Sceva had a title — they lost badly. Every consecrated believer carries the authority of the One in whose name they stand." },
      { text:"Ignorance of how the enemy operates is one of the primary reasons believers live below their God-given authority.", topic:"Spiritual Warfare", correct:1, community:[75,3,4,13,5], mirrorNote:"Two ignorances rob believers of their authority: ignorance of the enemy's devices, and ignorance of how to conduct spiritual warfare. Together, they produce a believer designed to win who lives as though losing." },
      { text:"Praying loudly and persistently is the primary factor that determines whether spiritual warfare is effective.", topic:"Prayer", correct:5, community:[5,30,8,12,45], mirrorNote:"Volume is not the credential. Holiness is. The sons of Sceva were bold — they lost badly. Acts 19 shows that the enemy responds not to noise but to the authority of a life aligned with Christ. This is a malformed standard." },
      { text:"Personal consecration is a prerequisite for effective spiritual warfare — an unholy life cannot carry genuine spiritual authority.", topic:"Consecration", correct:1, community:[74,3,4,14,5], mirrorNote:"The believer who is not consecrated has no business going into battle. Consecration is not a spiritual luxury — it is your credential in the war. 2 Timothy 2:21 connects cleansing to being 'useful to the Master.'" },
      { text:"Nations and territories are spiritually contested, with specific demonic forces assigned to resist the gospel's advance in those regions.", topic:"Territorial Warfare", correct:1, community:[68,4,5,17,6], mirrorNote:"Nations are not casually evangelized. Every territory on earth is supernaturally contested. You do not waltz into a city and reap the harvest without confronting what has been assigned there to resist you." },
      { text:"If a believer consistently faces spiritual difficulty and warfare, the most likely explanation is unconfessed sin in their life.", topic:"Suffering", correct:5, community:[7,28,5,10,50], mirrorNote:"Spiritual difficulty may reflect the enemy's targeted resistance — especially when a believer is advancing God's kingdom. The question 'what sin caused this?' is often the wrong place to start. This is a malformed question." },
      { text:"The gospel advances into new regions primarily through the quality of the message and the size of the team — not through spiritual warfare.", topic:"Territorial Warfare", correct:2, community:[4,64,6,18,8], mirrorNote:"Paul's confrontation with demonic resistance in Ephesus shows that gospel advancement requires more than good communication — it requires prevailing in the spiritual conflict assigned against it." },
      { text:"Understanding the ranks and hierarchy of demonic opposition is more about morbid fascination than practical Christian living.", topic:"Spiritual Warfare", correct:2, community:[5,68,7,14,6], mirrorNote:"Understanding the ranks is the intelligence briefing that makes prayer strategic rather than vague. You cannot strategize against something you refuse to acknowledge." },
      { text:"A believer's spiritual authority is primarily determined by the depth of their theological education.", topic:"Spiritual Authority", correct:2, community:[4,68,6,16,6], mirrorNote:"Consecration, not education, is the credential. The sons of Sceva presumably knew enough theology to invoke Jesus' name. What they lacked was a consecrated life that carried genuine authority." },
      { text:"Satan's kingdom operates as an organized military structure, not chaotic random resistance.", topic:"Spiritual Warfare", correct:1, community:[70,4,4,16,6], mirrorNote:"Ephesians 6:12 uses four distinct terms — rulers, authorities, powers, forces — describing a hierarchy. Satan's kingdom is deliberate and organized, not chaotic." },
      { text:"Prayer without consecration is like wielding a weapon you haven't earned the authority to carry.", topic:"Consecration", correct:1, community:[71,4,4,15,6], mirrorNote:"The sons of Sceva used the right name without the right life. The enemy's response — 'who are you?' — revealed that authority in the spiritual realm is backed by a consecrated life. A prayer launched from an unconsecrated life is hollow." },
      { text:"Believers who understand demonic opposition are equipped to pray with more strategic precision than those who don't.", topic:"Spiritual Knowledge", correct:1, community:[73,3,4,14,6], mirrorNote:"2 Corinthians 2:11 — Paul was not ignorant of Satan's schemes. The intelligence briefing about organized demonic opposition transforms vague general prayer into strategic, targeted intercession." },
      { text:"The church's primary tools for advancing God's kingdom are education, social justice, and good communication strategy.", topic:"Spiritual Warfare", correct:5, community:[10,32,8,14,36], mirrorNote:"These are not wrong tools, but they are insufficient without spiritual engagement. The diagnosis is that the church has adopted a purely natural strategy for a supernaturally contested mission. Whether these are 'primary' vs. 'insufficient without warfare' is the sermon's challenge. This is a malformed framing." }
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
  { id:'pre-sort',    label:'Pre-Check', icon:'quiz',           title:'Pre-Check'   },
  { id:'watch-sort',  label:'Watch',   icon:'play_circle',     title:'Watch & Sort' },
  { id:'mirror',      label:'Mirror',  icon:'compare_arrows',  title:'The Mirror'  },
  { id:'formation',   label:'Study',   icon:'menu_book',       title:'Formation'   },
  { id:'library',     label:'Stones',  icon:'layers',          title:'My Stones'   },
  { id:'assess',      label:'Assess',  icon:'fact_check',      title:'Assess'      },
];
