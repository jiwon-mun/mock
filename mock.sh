curl -X POST "http://localhost:5432/reviews" \
  -H "Content-Type: application/json" \
  -d '{
    "pros": "Great product, works well. Provides excellent value for the price.",
    "cons": "A bit pricey, but definitely worth it for the results it delivers.",
    "tip": "Use it regularly for best results.",
    "rating": 3,
    "is_recommended": false,
    "product_id": 976,
    "product_name": "Super Product 25",
    "product_image": "https://placehold.co/180x180/brown/white",
    "brand_id": 3362,
    "brand_name": "SuperBrand 67",
    "user_id": 279,
    "nickname": "user_5765",
    "tags": ["Gifting", "SensitiveSkin", "30s"]
  }'

curl -X POST "http://localhost:5432/reviews" \
  -H "Content-Type: application/json" \
  -d '{
    "pros": "The product exceeded my expectations, offering excellent quality and features.",
    "cons": "It is on the expensive side, which might be a barrier for some.",
    "tip": "Use it regularly for best results.",
    "rating": 5,
    "is_recommended": true,
    "product_id": 418,
    "product_name": "Super Product 29",
    "product_image": "https://placehold.co/180x180/red/white",
    "brand_id": 5056,
    "brand_name": "SuperBrand 64",
    "user_id": 861,
    "nickname": "user_6481",
    "tags": ["Luxury", "SensitiveSkin", "US"]
  }'

curl -X POST "http://localhost:5432/reviews" \
  -H "Content-Type: application/json" \
  -d '{
    "pros": "Product performance is outstanding, providing great results consistently.",
    "cons": "Somewhat difficult to use at first, requires a learning curve.",
    "tip": "Use it regularly for best results.",
    "rating": 5,
    "is_recommended": false,
    "product_id": 435,
    "product_name": "Super Product 87",
    "product_image": "https://placehold.co/180x180/gray/white",
    "brand_id": 7131,
    "brand_name": "SuperBrand 34",
    "user_id": 597,
    "nickname": "user_2565",
    "tags": ["Gifting", "US", "Beauty"]
  }'

curl -X POST "http://localhost:5432/reviews" \
  -H "Content-Type: application/json" \
  -d '{
    "pros": "Highly effective, great for skin care, leaving the skin feeling smooth.",
    "cons": "The price is a bit high for the quantity you get, but worth it.",
    "tip": "Use it regularly for best results.",
    "rating": 5,
    "is_recommended": false,
    "product_id": 187,
    "product_name": "Super Product 90",
    "product_image": "https://placehold.co/180x180/brown/white",
    "brand_id": 4533,
    "brand_name": "SuperBrand 71",
    "user_id": 171,
    "nickname": "user_9604",
    "tags": ["Beauty", "30s", "Luxury"]
  }'

curl -X POST "http://localhost:5432/reviews" \
  -H "Content-Type: application/json" \
  -d '{
    "pros": "Great product overall with a nice scent and smooth application.",
    "cons": "It could be more affordable given the small packaging size.",
    "tip": "Use it regularly for best results.",
    "rating": 1,
    "is_recommended": false,
    "product_id": 756,
    "product_name": "Super Product 13",
    "product_image": "https://placehold.co/180x180/orange/white",
    "brand_id": 9688,
    "brand_name": "SuperBrand 94",
    "user_id": 383,
    "nickname": "user_2173",
    "tags": ["Beauty", "30s", "SensitiveSkin"]
  }'

curl -X POST "http://localhost:5432/reviews" \
  -H "Content-Type: application/json" \
  -d '{
    "pros": "Very effective and high-quality product that gives excellent results.",
    "cons": "The high cost can be a deterrent for regular use, especially in large quantities.",
    "tip": "Use it regularly for best results.",
    "rating": 5,
    "is_recommended": true,
    "product_id": 582,
    "product_name": "Super Product 13",
    "product_image": "https://placehold.co/180x180/gray/white",
    "brand_id": 5164,
    "brand_name": "SuperBrand 45",
    "user_id": 130,
    "nickname": "user_2853",
    "tags": ["SensitiveSkin", "Luxury", "EcoFriendly"]
  }'

curl -X POST "http://localhost:5432/reviews" \
  -H "Content-Type: application/json" \
  -d '{
    "pros": "The product exceeded expectations with remarkable results and durability.",
    "cons": "Price is an issue, though the quality justifies it to some extent.",
    "tip": "Use it regularly for best results.",
    "rating": 1,
    "is_recommended": true,
    "product_id": 887,
    "product_name": "Super Product 74",
    "product_image": "https://placehold.co/180x180/red/white",
    "brand_id": 7003,
    "brand_name": "SuperBrand 2",
    "user_id": 924,
    "nickname": "user_4939",
    "tags": ["Beauty", "30s", "Gifting"]
  }'

curl -X POST "http://localhost:5432/reviews" \
  -H "Content-Type: application/json" \
  -d '{
    "pros": "Product works well with great texture, feeling smooth on the skin.",
    "cons": "Price is steep, and the packaging size could be larger for the cost.",
    "tip": "Use it regularly for best results.",
    "rating": 3,
    "is_recommended": false,
    "product_id": 753,
    "product_name": "Super Product 45",
    "product_image": "https://placehold.co/180x180/yellow/white",
    "brand_id": 5009,
    "brand_name": "SuperBrand 90",
    "user_id": 574,
    "nickname": "user_6644",
    "tags": ["Beauty", "US", "30s"]
  }'

curl -X POST "http://localhost:5432/reviews" \
  -H "Content-Type: application/json" \
  -d '{
    "pros": "Highly efficient and very effective at achieving the desired results.",
    "cons": "Though great, it's still quite expensive for everyday use.",
    "tip": "Use it regularly for best results.",
    "rating": 1,
    "is_recommended": false,
    "product_id": 210,
    "product_name": "Super Product 7",
    "product_image": "https://placehold.co/180x180/brown/white",
    "brand_id": 9878,
    "brand_name": "SuperBrand 41",
    "user_id": 995,
    "nickname": "user_7638",
    "tags": ["Gifting", "30s", "EcoFriendly"]
  }'
