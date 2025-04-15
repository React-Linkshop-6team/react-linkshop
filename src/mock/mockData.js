export const mockData = {
  nextCursor: 0,
  list: [
    {
      id: 1,
      name: '귀여운 고양이샵',
      likes: 10,
      shop: {
        imageUrl: 'https://example.com/shop1.png',
        urlName: 'cat-shop',
        shopUrl: 'https://example.com/cat-shop',
        id: 1,
      },
      productsCount: 2,
      products: [
        {
          id: 101,
          name: '고양이 장난감',
          imageUrl: 'https://example.com/product1.png',
        },
        {
          id: 102,
          name: '고양이 침대',
          imageUrl: 'https://example.com/product2.png',
        },
      ],
      teamId: 'team123',
      updatedAt: '2025-04-15T04:35:16.229Z',
      createdAt: '2025-04-15T04:35:16.229Z',
      userId: 'user123',
    },

    {
      id: 2,
      name: '멋진 강아지샵',
      likes: 5,
      shop: {
        imageUrl: 'https://example.com/shop2.png',
        urlName: 'dog-shop',
        shopUrl: 'https://example.com/dog-shop',
        id: 2,
      },
      productsCount: 1,
      products: [
        {
          id: 201,
          name: '강아지 옷',
          imageUrl: 'https://example.com/product3.png',
        },
      ],
      teamId: 'team456',
      updatedAt: '2025-04-15T04:35:16.229Z',
      createdAt: '2025-04-15T04:35:16.229Z',
      userId: 'user456',
    },

    {
      id: 3,
      name: '다용도 펫샵',
      likes: 8,
      shop: {
        imageUrl: 'https://example.com/shop3.png',
        urlName: 'pet-shop',
        shopUrl: 'https://example.com/pet-shop',
        id: 3,
      },
      productsCount: 3,
      products: [
        {
          id: 301,
          name: '펫 물통',
          imageUrl: 'https://example.com/product4.png',
        },
        {
          id: 302,
          name: '펫 빗',
          imageUrl: 'https://example.com/product5.png',
        },
        {
          id: 303,
          name: '펫 이동가방',
          imageUrl: 'https://example.com/product6.png',
        },
      ],
      teamId: 'team789',
      updatedAt: '2025-04-15T04:35:16.229Z',
      createdAt: '2025-04-15T04:35:16.229Z',
      userId: 'user789',
    },
  ],
}
