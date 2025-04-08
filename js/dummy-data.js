/**
 * AutoMarket - Dummy Data
 * Contains sample car listings for development and demo purposes
 */

// Sample car data
const dummyCars = [
    {
        id: 1,
        title: "Toyota Camry Hybrid SL",
        price: 32990,
        year: 2022,
        mileage: 15000,
        location: "Sydney, NSW",
        fuel: "Hybrid",
        transmission: "Automatic",
        bodyType: "Sedan",
        color: "Platinum White",
        description: "This Toyota Camry Hybrid SL is in excellent condition with low kilometers. Features include leather seats, panoramic sunroof, adaptive cruise control, and Toyota Safety Sense package.",
        sellerType: "Dealer",
        sellerName: "Sydney City Toyota",
        image: "./images/cars/toyota-camry.jpg",
        images: [
            "./images/cars/toyota-camry-1.jpg",
            "./images/cars/toyota-camry-2.jpg",
            "./images/cars/toyota-camry-3.jpg",
            "./images/cars/toyota-camry-4.jpg"
        ],
        features: [
            "Leather Seats",
            "Sunroof",
            "Adaptive Cruise Control",
            "Apple CarPlay/Android Auto",
            "Reverse Camera",
            "Lane Departure Warning",
            "Blind Spot Monitoring",
            "Heated Seats"
        ],
        tags: ["Featured", "Low KM"]
    },
    {
        id: 2,
        title: "BMW X5 xDrive30d M Sport",
        price: 89900,
        year: 2021,
        mileage: 22500,
        location: "Melbourne, VIC",
        fuel: "Diesel",
        transmission: "Automatic",
        bodyType: "SUV",
        color: "Mineral White",
        description: "Stunning BMW X5 xDrive30d M Sport with full service history. Features include M Sport package, panoramic sunroof, Harman Kardon sound system, and BMW Live Cockpit Professional.",
        sellerType: "Dealer",
        sellerName: "BMW Melbourne",
        image: "./images/cars/bmw-x5.jpg",
        images: [
            "./images/cars/bmw-x5-1.jpg",
            "./images/cars/bmw-x5-2.jpg",
            "./images/cars/bmw-x5-3.jpg",
            "./images/cars/bmw-x5-4.jpg"
        ],
        features: [
            "Leather Seats",
            "Panoramic Sunroof",
            "Harman Kardon Sound System",
            "Head-Up Display",
            "Wireless Charging",
            "360° Camera",
            "Heated/Ventilated Seats",
            "Adaptive Suspension"
        ],
        tags: ["Featured", "Premium"]
    },
    {
        id: 3,
        title: "Mazda CX-5 Touring",
        price: 36490,
        year: 2021,
        mileage: 18400,
        location: "Brisbane, QLD",
        fuel: "Petrol",
        transmission: "Automatic",
        bodyType: "SUV",
        color: "Soul Red Crystal",
        description: "Beautiful Mazda CX-5 Touring with full service history. Features include leather trim, Bose sound system, adaptive cruise control, and Mazda's i-Activsense safety technologies.",
        sellerType: "Dealer",
        sellerName: "Brisbane Mazda",
        image: "./images/cars/mazda-cx5.jpg",
        images: [
            "./images/cars/mazda-cx5-1.jpg",
            "./images/cars/mazda-cx5-2.jpg",
            "./images/cars/mazda-cx5-3.jpg",
            "./images/cars/mazda-cx5-4.jpg"
        ],
        features: [
            "Leather Trim",
            "Bose Sound System",
            "Adaptive Cruise Control",
            "Apple CarPlay/Android Auto",
            "Reverse Camera",
            "Blind Spot Monitoring",
            "Rear Cross Traffic Alert",
            "Satellite Navigation"
        ],
        tags: ["New Arrival"]
    },
    {
        id: 4,
        title: "Honda Civic RS Hatch",
        price: 28750,
        year: 2021,
        mileage: 32700,
        location: "Perth, WA",
        fuel: "Petrol",
        transmission: "CVT",
        bodyType: "Hatchback",
        color: "Rallye Red",
        description: "Sporty Honda Civic RS Hatch with one owner and full service history. Features include sports seats, sunroof, premium audio system, and Honda Sensing safety suite.",
        sellerType: "Private",
        sellerName: "Michael",
        image: "./images/cars/honda-civic.jpg",
        images: [
            "./images/cars/honda-civic-1.jpg",
            "./images/cars/honda-civic-2.jpg",
            "./images/cars/honda-civic-3.jpg",
            "./images/cars/honda-civic-4.jpg"
        ],
        features: [
            "Sports Seats",
            "Sunroof",
            "Premium Audio System",
            "Apple CarPlay/Android Auto",
            "Reverse Camera",
            "Lane Keep Assist",
            "Adaptive Cruise Control",
            "Heated Seats"
        ],
        tags: ["Great Value"]
    },
    {
        id: 5,
        title: "Mercedes-Benz GLC 300 4MATIC",
        price: 66400,
        year: 2020,
        mileage: 27500,
        location: "Sydney, NSW",
        fuel: "Petrol",
        transmission: "Automatic",
        bodyType: "SUV",
        color: "Obsidian Black",
        description: "Elegant Mercedes-Benz GLC 300 4MATIC with low kilometers. Features include AMG Line exterior, Burmester sound system, panoramic sunroof, and Mercedes-Benz safety package.",
        sellerType: "Dealer",
        sellerName: "Mercedes-Benz Sydney",
        image: "./images/cars/mercedes-glc.jpg",
        images: [
            "./images/cars/mercedes-glc-1.jpg",
            "./images/cars/mercedes-glc-2.jpg",
            "./images/cars/mercedes-glc-3.jpg",
            "./images/cars/mercedes-glc-4.jpg"
        ],
        features: [
            "Leather Seats",
            "Panoramic Sunroof",
            "Burmester Sound System",
            "Head-Up Display",
            "Wireless Charging",
            "360° Camera",
            "Heated Seats",
            "Ambient Lighting"
        ],
        tags: ["Premium", "Low KM"]
    },
    {
        id: 6,
        title: "Toyota RAV4 Cruiser Hybrid",
        price: 42990,
        year: 2021,
        mileage: 19800,
        location: "Adelaide, SA",
        fuel: "Hybrid",
        transmission: "CVT",
        bodyType: "SUV",
        color: "Graphite",
        description: "Highly sought-after Toyota RAV4 Cruiser Hybrid with all the features. Includes leather accented seats, JBL sound system, panoramic view monitor, and Toyota Safety Sense.",
        sellerType: "Dealer",
        sellerName: "Adelaide Toyota",
        image: "./images/cars/toyota-rav4.jpg",
        images: [
            "./images/cars/toyota-rav4-1.jpg",
            "./images/cars/toyota-rav4-2.jpg",
            "./images/cars/toyota-rav4-3.jpg",
            "./images/cars/toyota-rav4-4.jpg"
        ],
        features: [
            "Leather Accented Seats",
            "JBL Sound System",
            "Panoramic View Monitor",
            "Apple CarPlay/Android Auto",
            "Wireless Charging",
            "Adaptive Cruise Control",
            "Heated/Ventilated Seats",
            "Power Tailgate"
        ],
        tags: ["Featured", "Eco-Friendly"]
    },
    {
        id: 7,
        title: "Volkswagen Golf GTI",
        price: 37990,
        year: 2019,
        mileage: 42000,
        location: "Melbourne, VIC",
        fuel: "Petrol",
        transmission: "Automatic",
        bodyType: "Hatchback",
        color: "Pure White",
        description: "Volkswagen Golf GTI with superb performance and handling. Features include sports seats, adaptive chassis control, premium sound system, and Volkswagen safety technologies.",
        sellerType: "Dealer",
        sellerName: "Volkswagen Melbourne",
        image: "./images/cars/vw-golf.jpg",
        images: [
            "./images/cars/vw-golf-1.jpg",
            "./images/cars/vw-golf-2.jpg",
            "./images/cars/vw-golf-3.jpg",
            "./images/cars/vw-golf-4.jpg"
        ],
        features: [
            "Sports Seats",
            "Adaptive Chassis Control",
            "Premium Sound System",
            "Apple CarPlay/Android Auto",
            "Reverse Camera",
            "Adaptive Cruise Control",
            "LED Headlights",
            "Satellite Navigation"
        ],
        tags: ["Hot Hatch", "Performance"]
    },
    {
        id: 8,
        title: "Hyundai Tucson Highlander",
        price: 39990,
        year: 2022,
        mileage: 12500,
        location: "Brisbane, QLD",
        fuel: "Diesel",
        transmission: "Automatic",
        bodyType: "SUV",
        color: "Deep Sea Blue",
        description: "Near-new Hyundai Tucson Highlander with remaining factory warranty. Features include leather seats, panoramic sunroof, BOSE premium sound, and Hyundai SmartSense safety.",
        sellerType: "Dealer",
        sellerName: "Brisbane Hyundai",
        image: "./images/cars/hyundai-tucson.jpg",
        images: [
            "./images/cars/hyundai-tucson-1.jpg",
            "./images/cars/hyundai-tucson-2.jpg",
            "./images/cars/hyundai-tucson-3.jpg",
            "./images/cars/hyundai-tucson-4.jpg"
        ],
        features: [
            "Leather Seats",
            "Panoramic Sunroof",
            "BOSE Premium Sound",
            "Apple CarPlay/Android Auto",
            "360° Camera",
            "Blind Spot Monitoring",
            "Heated/Ventilated Seats",
            "Remote Smart Parking Assist"
        ],
        tags: ["New Arrival", "Premium"]
    },
    {
        id: 9,
        title: "Ford Mustang GT",
        price: 58990,
        year: 2020,
        mileage: 35000,
        location: "Sydney, NSW",
        fuel: "Petrol",
        transmission: "Automatic",
        bodyType: "Coupe",
        color: "Race Red",
        description: "Powerful Ford Mustang GT with 5.0L V8 engine. Features include leather seats, premium sound system, SYNC 3, and advanced driver assistance technologies.",
        sellerType: "Private",
        sellerName: "David",
        image: "./images/cars/ford-mustang.jpg",
        images: [
            "./images/cars/ford-mustang-1.jpg",
            "./images/cars/ford-mustang-2.jpg",
            "./images/cars/ford-mustang-3.jpg",
            "./images/cars/ford-mustang-4.jpg"
        ],
        features: [
            "Leather Seats",
            "Premium Sound System",
            "SYNC 3",
            "Apple CarPlay/Android Auto",
            "Reverse Camera",
            "Adaptive Cruise Control",
            "Heated/Cooled Seats",
            "Performance Package"
        ],
        tags: ["Performance", "V8"]
    },
    {
        id: 10,
        title: "Kia Sportage GT-Line",
        price: 41990,
        year: 2022,
        mileage: 8900,
        location: "Perth, WA",
        fuel: "Petrol",
        transmission: "Automatic",
        bodyType: "SUV",
        color: "Gravity Grey",
        description: "Nearly new Kia Sportage GT-Line with balance of 7-year factory warranty. Features include leather seats, panoramic sunroof, Harman Kardon sound system, and comprehensive safety tech.",
        sellerType: "Dealer",
        sellerName: "Perth Kia",
        image: "./images/cars/kia-sportage.jpg",
        images: [
            "./images/cars/kia-sportage-1.jpg",
            "./images/cars/kia-sportage-2.jpg",
            "./images/cars/kia-sportage-3.jpg",
            "./images/cars/kia-sportage-4.jpg"
        ],
        features: [
            "Leather Seats",
            "Panoramic Sunroof",
            "Harman Kardon Sound",
            "Apple CarPlay/Android Auto",
            "360° Camera",
            "Blind Spot Monitoring",
            "Heated/Ventilated Seats",
            "Remote Smart Parking Assist"
        ],
        tags: ["Featured", "Low KM"]
    },
    {
        id: 11,
        title: "Tesla Model 3 Long Range",
        price: 64990,
        year: 2021,
        mileage: 18600,
        location: "Melbourne, VIC",
        fuel: "Electric",
        transmission: "Automatic",
        bodyType: "Sedan",
        color: "Pearl White",
        description: "Tesla Model 3 Long Range with Autopilot. Features include premium interior, glass roof, premium audio system, and Tesla's cutting-edge technology and safety features.",
        sellerType: "Private",
        sellerName: "Sarah",
        image: "./images/cars/tesla-model3.jpg",
        images: [
            "./images/cars/tesla-model3-1.jpg",
            "./images/cars/tesla-model3-2.jpg",
            "./images/cars/tesla-model3-3.jpg",
            "./images/cars/tesla-model3-4.jpg"
        ],
        features: [
            "Premium Interior",
            "Glass Roof",
            "Premium Audio System",
            "Autopilot",
            "15\" Touchscreen",
            "Wireless Charging",
            "Heated Seats",
            "Over-the-air Updates"
        ],
        tags: ["Electric", "Premium"]
    },
    {
        id: 12,
        title: "Subaru Outback AWD",
        price: 39490,
        year: 2021,
        mileage: 24700,
        location: "Hobart, TAS",
        fuel: "Petrol",
        transmission: "CVT",
        bodyType: "Wagon",
        color: "Crystal White",
        description: "Versatile Subaru Outback AWD with X-Mode off-road capability. Features include leather interior, 11.6\" touchscreen, EyeSight driver assist technology, and premium sound system.",
        sellerType: "Dealer",
        sellerName: "Hobart Subaru",
        image: "./images/cars/subaru-outback.jpg",
        images: [
            "./images/cars/subaru-outback-1.jpg",
            "./images/cars/subaru-outback-2.jpg",
            "./images/cars/subaru-outback-3.jpg",
            "./images/cars/subaru-outback-4.jpg"
        ],
        features: [
            "Leather Interior",
            "11.6\" Touchscreen",
            "EyeSight Driver Assist",
            "X-Mode Off-road System",
            "Apple CarPlay/Android Auto",
            "Harman Kardon Sound",
            "Heated Seats",
            "Power Tailgate"
        ],
        tags: ["AWD", "Adventure"]
    }
];

// Featured cars (subset of dummyCars)
const featuredCars = dummyCars.filter(car => car.tags.includes('Featured'));

// Newest cars (sorted by year, then by id)
const newestCars = [...dummyCars].sort((a, b) => {
    if (b.year !== a.year) {
        return b.year - a.year;
    }
    return b.id - a.id;
});

// Function to format car price
function formatPrice(price) {
    return '$' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Function to format car details for display
function formatCarDetails(car) {
    return {
        ...car,
        formattedPrice: formatPrice(car.price),
        formattedMileage: car.mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' km'
    };
}
