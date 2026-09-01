export const site = {
  couple: {
    names: "Angelique & Franco",
    partnerOne: "Angelique",
    partnerTwo: "Franco",
  },
  wedding: {
    dateLabel: "Saturday, 20 March 2027",
    locationLabel: "Haenertsburg, Limpopo",
    ceremonyTimeLabel: "15:00",
    timezone: "Africa/Johannesburg",
    /** ISO timestamp used by the countdown — 20 March 2027, 15:00 SAST */
    startAt: "2027-03-20T15:00:00+02:00",
  },
  rsvp: {
    deadlineLabel: "20 December 2026",
    deadlineAt: "2026-12-20T23:59:59+02:00",
    confirmationTitle: "Thank you",
    confirmationAttending:
      "We've received your RSVP and can't wait to celebrate with you.",
    confirmationDeclining:
      "We've received your RSVP. We'll miss you on the day, and thank you for letting us know.",
    duplicateMessage:
      "This email has already been used to RSVP. If you need to change your response, please get in touch with Angelique or Franco.",
    alreadyMessage: "We've already received your RSVP. Thank you.",
  },
  photos: {
    couple: "/photos/couple.jpg",
    ceremony: "/photos/ceremony.jpg",
    breakfast: "/photos/breakfast.jpg",
    travel: "/photos/travel.jpg",
    accommodationDirectory: "/photos/accommodation-directory.jpg",
  },
  venue: {
    ceremonyName: "Minas Farm Venue",
    breakfastName: "Zwakala Brewery",
    town: "Haenertsburg",
    directionsToTownUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Haenertsburg%2C%20Limpopo",
    directionsToVenueUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Minas%20Farm%20Venue%2C%20Cheerio%20Road%2C%20Haenertsburg",
  },
  travelNotice: {
    heading: "IMPORTANT — GETTING TO THE VENUE",
    title: "Getting to the Venue",
    paragraphs: [
      "Please note that all roads leading to the venue are gravel roads.",
      "To ensure you take the best and easiest route, please do not set your GPS directly to Minas Farm Venue, as this may direct you onto a difficult road.",
      "Instead, set your destination to **Haenertsburg** first. Once you arrive in Haenertsburg, you can then set your GPS to **Minas Farm Venue**.",
    ],
  },
  travelSteps: [
    {
      step: "1",
      title: "Travel to Haenertsburg",
      body: "Set your GPS to Haenertsburg first — not to the venue.",
    },
    {
      step: "2",
      title: "Then set GPS to Minas Farm Venue",
      body: "Once you have arrived in Haenertsburg, set your destination to Minas Farm Venue.",
    },
    {
      step: "3",
      title: "Follow the signs",
      body: "From there, follow the Minas Farm Venue and Zwakala signs along Cheerio Road.",
    },
  ],
  parking: {
    title: "Where to park",
    body: "There is free parking available on the **Minas** and **Zwakala Brewery** premises. Both are a short walking distance from the ceremony.",
  },
  schedule: [
    {
      id: "ceremony",
      title: "Ceremony",
      venue: "Minas Farm Venue",
      photo: "/photos/ceremony.jpg",
      details: [
        "Dress code: Semi-Formal Attire",
        "We're getting married!",
        "The ceremony will start at **15:00**. Please be seated before then.",
        "Official schedule to be communicated on the day.",
      ],
    },
    {
      id: "breakfast",
      title: "Post-Wedding Breakfast",
      venue: "Zwakala Brewery",
      photo: "/photos/breakfast.jpg",
      details: [
        "If you're staying on a bit longer, join us for breakfast on the premises at Zwakala Brewery!",
        "More details to follow soon.",
      ],
    },
  ],
  /** Add later events here — they will appear on the Schedule page. */
  scheduleTba: [] as Array<{
    id: string;
    title: string;
    venue?: string;
    photo?: string;
    details: string[];
  }>,
  accommodation: {
    title: "Where to Stay",
    intro: [
      "To make things a bit easier, we're sharing a few accommodations in Haenertsburg.",
      "Accommodation in Haenertsburg can fill up quickly, especially on long weekends. If you're planning to stay overnight, we'd recommend booking your accommodation early to secure the rates while they're still available.",
      "Please note that accommodation on the venue is only available for close family and the bridal party.",
    ],
    directoryImageCaption: "Accommodation directory",
    listings: [
      {
        id: "cheerio",
        name: "Cheerio Trout Fishing & Holiday Resort",
        note: "Self-catering cottages in Cheerio Valley, a short drive from Haenertsburg.",
        url: "https://www.cheerio.co.za/",
        photo: "/photos/stay-cheerio.jpg",
      },
      {
        id: "africamps",
        name: "AfriCamps at Magoebaskloof",
        note: "Boutique glamping tents in Magoebaskloof, convenient for the weekend.",
        url: "https://africamps.com/listings/africamps-at-magoebaskloof/",
        photo: "/photos/stay-africamps.jpg",
      },
      {
        id: "magoebaskloof-hotel",
        name: "Magoebaskloof Hotel",
        note: "A local hotel option close to Haenertsburg and the mountain pass.",
        url: "https://www.magoebaskloof.co.za/",
        photo: "/photos/stay-hotel.jpg",
      },
    ],
  },
  faqs: [
    {
      question: "When is the RSVP deadline?",
      answer:
        "Please RSVP by **20 December 2026**, so we can have an accurate headcount.",
    },
    {
      question: "How do I get to the venue?",
      answer:
        "Please note that all roads leading to the venue are gravel roads.\n\nTo ensure you take the best and easiest route, please do not set your GPS directly to Minas Farm Venue, as this may direct you onto a difficult road.\n\nInstead, set your destination to **Haenertsburg** first. Once you arrive in Haenertsburg, you can then set your GPS to **Minas Farm Venue**.",
    },
    {
      question: "Where should I park?",
      answer:
        "There is free parking available on the **Minas** and **Zwakala Brewery** premises. Both are a short walking distance from the ceremony.",
    },
    {
      question: "Are kids welcome?",
      answer:
        "As much as we love your little ones, we will not be including them on our wedding day.",
    },
    {
      question: "Is the wedding indoors or outdoors?",
      answer:
        "Our wedding ceremony and reception will both take place outdoors.\n\nIf the weather turns, the reception will take place indoors.\n\nMarch temperatures should be normal.",
    },
    {
      question: "Is there a cash bar?",
      answer: "Please note: A cash bar will be available throughout the evening.",
    },
    {
      question: "What time should guests arrive?",
      answer:
        "The ceremony begins at **15:00**. Please be seated before then — we recommend arriving by **14:30**.",
    },
    {
      question: "Is there accommodation at the venue?",
      answer:
        "Accommodation on the venue is only available for close family and the bridal party. All other guests will find stays in and around Haenertsburg — see the Stay page for a few starting points.",
    },
    {
      question: "What should I do if I have trouble finding the venue?",
      answer:
        "Do not follow a GPS route that skips Haenertsburg. Travel to **Haenertsburg** first, then set your GPS to **Minas Farm Venue**, and follow the Minas and Zwakala signs along Cheerio Road.",
    },
  ],
  registry: {
    title: "Registry",
    paragraphs: [
      "Having you celebrate our special day with us is already more than we could ask for, and your presence is truly the greatest gift!",
      "If you would like to give something, a contribution towards our honeymoon or home fund would be deeply appreciated as we begin this next chapter together.",
      "Please know that there is absolutely no expectation to give — having you there to share in our happiness means the world to us.",
    ],
    contribution: {
      heading: "Should you wish to contribute",
      placeholder:
        "Bank details will be added here shortly. If you already have them from us, please use those.",
      accountName: "",
      bank: "",
      accountNumber: "",
      branchCode: "",
      referenceHint: "Please use your name as the payment reference.",
    },
  },
  additionalInfo: {
    title: "Additional Information",
    items: [
      {
        id: "cash-bar",
        title: "Cash Bar",
        body: "A cash bar will be available throughout the evening.",
      },
    ],
  },
} as const;

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/schedule", label: "Schedule" },
  { href: "/travel", label: "Travel" },
  { href: "/accommodation", label: "Stay" },
  { href: "/qa", label: "Q&A" },
  { href: "/registry", label: "Registry" },
  { href: "/info", label: "Info" },
] as const;
