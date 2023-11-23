


 const cards = [
    {
      id: 1,
      image: '/images/chelsea.png',
      showDefault: true,
      flipped: false,
      isMatched: false,
    },
    {
      id: 2,
      image: '/images/barcelona.png',
      showDefault: true,
      flipped: false,
      isMatched: false,
    },
    {
      id: 3,
      image: '/images/arsenal.png',
      showDefault: true,
      flipped: false,
      isMatched: false,
    },
    {
      id: 4,
      image: '/images/real_madrid.png',
      showDefault: true,
      flipped: false,
      isMatched: false,
    },
    {
      id: 5,
      image: '/images/liverpool.png',
      showDefault: true,
      flipped: false,
      isMatched: false,
    },
    {
      id: 6,
      image: '/images/manchester_city.png',
      showDefault: true,
      flipped: false,
      isMatched: false,
    },
    {
      id: 1,
      image: '/images/chelsea.png',
      showDefault: true,
      flipped: false,
      isMatched: false,
    },
    {
      id: 2,
      image: '/images/barcelona.png',
      showDefault: true,
      flipped: false,
      isMatched: false,
    },
    {
      id: 3,
      image: '/images/arsenal.png',
      showDefault: true,
      flipped: false,
      isMatched: false,
    },
    {
      id: 4,
      image: '/images/real_madrid.png',
      showDefault: true,
      flipped: false,
      isMatched: false,
    },
    {
      id: 5,
      image: '/images/liverpool.png',
      showDefault: true,
      flipped: false,
      isMatched: false,
    },
    {
      id: 6,
      image: '/images/manchester_city.png',
      showDefault: true,
      flipped: false,
      isMatched: false,
    }
  ];


  export const shuffleCards = () => {
  
    for (let currentIndex = cards.length - 1; currentIndex > 0; currentIndex--) {
      const randomIndex = Math.floor(Math.random() * (currentIndex + 1))
  
      const tempCard = cards[currentIndex]
  
      cards[currentIndex] = cards[randomIndex]
  
      cards[randomIndex] = tempCard
  
  
    }
  
    return cards
  
  }