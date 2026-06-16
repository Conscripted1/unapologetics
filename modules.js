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
        body: "In 2014, engineers drilling the foundation for One World Trade Center sent steel beams 150 feet into Manhattan bedrock before a single visible floor was added. No ribbon-cutting. No ceremony. Just invisible work that would make everything visible possible. Jesus understood this principle long before architects did. In Matthew 7, He doesn't describe two builders with different blueprints — they both build, they both face storms. The only difference is what they built on. This is the paradox of spiritual formation: the most important work you will ever do is the work no one will ever see. Your prayer life before sunrise, your Scripture study in private, your repentance when no one's watching, your surrender in secret — these are not preparation for the real work. They are the real work. Ephesians 3:17–19 prays that believers would be 'rooted and grounded' before they are fully grasped. Paul's order is deliberate: the root comes before the grasp. Everything else is just the part people can see. The question isn't 'Will I build?' — it's 'Am I willing to dig?'"
      },
      {
        title: "Agreement vs. Alignment",
        icon: "auto_stories",
        scripture: "James 1:22–25",
        body: "Dallas Willard observed in The Divine Conspiracy that modern Christianity has collapsed discipleship into either believing the right thing or doing the right thing, when the goal is actually becoming — having belief and behavior fuse into who you are. Pastor Hollis draws the same line with sharper language: it is entirely possible to agree with what God says and never align your life to reflect it. Agreement happens in a moment. Alignment happens over a lifetime. You can agree that prayer matters without praying. You can agree that forgiveness is required without forgiving. You can shout over a sermon you never plan to submit to. James 1:22 calls this self-deception: being a hearer only, looking at your face in a mirror and immediately forgetting what you saw. The alignment test is concrete: does your calendar, your closest relationships, and what you do with your money look like the life of someone who is actually submitting to God's Word? Your agreement can't answer that. Only your alignment can."
      },
      {
        title: "Storms Reveal, They Don't Create",
        icon: "shield",
        scripture: "Romans 5:3–5",
        body: "One of the sermon's most disorienting claims is that both builders faced the same storm. Obedience did not exempt the wise builder from rain, rising streams, and wind — it only determined whether the house stood. This completely reframes what a storm is for. If obedience doesn't prevent the storm, then the storm is not a verdict on your behavior. It is a diagnostic on your foundation. Storms expose what was already true: cracks you didn't know existed, structures you assumed were solid, depth that hadn't been tested. Romans 5 goes further — Paul says we rejoice in our sufferings because suffering produces perseverance, perseverance produces character, and character produces hope. The storm isn't undoing you. It is forming you — but only if you built on the rock. The wise builder doesn't dread the storm because the storm only confirms what was already true before it arrived. The question to bring into every storm is not 'Why is this happening to me?' but 'What is this revealing in me?'"
      },
      {
        title: "Three Storms That Test Your Foundation",
        icon: "psychology",
        scripture: "1 Peter 1:6–7",
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
        body:"Moses tells Israel that God led them through the wilderness to humble and test them — to reveal what was in their hearts. The wilderness was never a detour from God's plan. It was the plan. God uses seasons of discomfort, waiting, and uncertainty to develop the internal character required to steward external promise. The question is not \"when will this be over?\" but \"God, what are You forming in me?\""
      },
      {
        title:"Egypt Is a Mindset, Not Just a Place",
        icon:"psychology",
        scripture:"Numbers 13:33",
        body:"When Israel said \"we seemed like grasshoppers in our own eyes,\" they weren't describing the giants — they were describing themselves through the lens of 400 years of slavery. Egypt had named them. The chains were broken, but the identity hadn't been. God's deliverance changes your location. Only His formation changes your self-perception. You can leave an old season while still carrying the mindset of it."
      },
      {
        title:"The Grasshopper Problem",
        icon:"person",
        scripture:"Numbers 13:33",
        body:"The spies called themselves grasshoppers before the Canaanites did. They preemptively disqualified themselves using a slave identity that no longer applied. This is the grasshopper problem: allowing a past label — failure, inadequate, unworthy, too broken — to define your present capacity. God had already said something different about them. The question every believer must answer is whose word they will believe about themselves."
      },
      {
        title:"God's Promises Don't Expire",
        icon:"verified",
        scripture:"Joshua 21:45",
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
