let userIdCounter = 1;
let orderIdCounter = 1;
let publisherIdCounter = 1;
let reviewIdCounter = 1;
let bookStoreIdCounter = 1;
let productOwnerIdCounter = 1;

class User {
    constructor(username, email, passwordHash) {
        this.userId = userIdCounter++;
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
        this.deliveryAddress = null;
        this.orders = [];
    }

    placeOrder(order) {
        this.orders.push(order);
        console.log(`> Order #${order.orderNumber} was placed by user '${this.username}'.`);
    }
}

class Order {
    constructor(user) {
        if (!user) {
            throw new Error('Order requires a user!');
        }
        this.orderNumber = orderIdCounter++;
        this.price = 0;
        this.userId = user.userId;
        this.orderDetails = [];
    }

    addBook(book, quantity) {
        if (!book || !quantity || quantity <= 0) {
            throw new Error('Please provide a valid book and quantity.');
        }
        const detail = new OrderDetails(this, book, quantity);
        this.orderDetails.push(detail);
        this.price += detail.priceAtPurchase * quantity; 
        console.log(`> Added ${quantity}x "${book.name}" to order #${this.orderNumber}.`);
    }
}

class Book {
    constructor(isbn, name, price, publisher) {
        if (!publisher) {
            throw new Error('Book requires a publisher!');
        }
        this.isbn = isbn;
        this.name = name;
        this.price = price;
        this.publisherId = publisher.publisherId;
        this.reviews = [];
    }
    
    addReview(review) {
        this.reviews.push(review);
    }
}

class Publisher {
    constructor(name, address) {
        this.publisherId = publisherIdCounter++;
        this.name = name;
        this.address = address;
        this.books = [];
    }
    
    publishBook(book) {
        this.books.push(book);
    }
}

class BookStore {
    constructor(name, address) {
        this.bookStoreId = bookStoreIdCounter++;
        this.name = name;
        this.address = address;
        this.inventory = [];
    }

    addBookToStock(book, quantity) {
        const inventoryItem = new Inventory(this, book, quantity);
        this.inventory.push(inventoryItem);
        console.log(`> Stocked "${book.name}" (${quantity} pcs) at bookstore "${this.name}".`);
    }
}

class Review {
    constructor(book, user, rating, comment) {
        this.reviewId = reviewIdCounter++;
        this.rating = rating;
        this.comment = comment;
        this.date = new Date().toISOString();
        this.bookISBN = book.isbn;
        this.userId = user.userId;
    }
}

class OrderDetails {
    constructor(order, book, quantity) {
        this.orderNumber = order.orderNumber;
        this.isbn = book.isbn;
        this.quantity = quantity;
        this.priceAtPurchase = book.price;
    }
}

class Inventory {
    constructor(bookStore, book, stockQuantity) {
        this.bookStoreId = bookStore.bookStoreId;
        this.isbn = book.isbn;
        this.stockQuantity = stockQuantity;
    }
}


const ksd = new Publisher('КСД', 'м. Харків, вул. Богдана Хмельницького, 24');
const vivat = new Publisher('Віват', 'м. Харків, вул. Микити Гомоненка, 10');
const bookYeStore = new BookStore("Книгарня 'Є'", "м. Київ, пров. Політехнічний, 1/33");

const fourthWing = new Book('978-617-15-0497-4', 'Четверте крило', 528, ksd);
ksd.publishBook(fourthWing);

const prykhovaniMalyunky = new Book('978-617-12-9821-7', 'Приховані малюнки', 384, ksd);
ksd.publishBook(prykhovaniMalyunky);

const spravaVasylyaStusa = new Book('978-966-942-927-8', 'Справа Василя Стуса', 688, vivat);
vivat.publishBook(spravaVasylyaStusa);

bookYeStore.addBookToStock(fourthWing, 20);
bookYeStore.addBookToStock(spravaVasylyaStusa, 15);

const oleksandra = new User('olexandra_kk', 'aleksandra200689@gmail.com', 'hash123');
const pesPatron = new User('pes_patron2022', 'patron@gmail.com', 'hash456');

const order1 = new Order(oleksandra);
order1.addBook(fourthWing, 2);
order1.addBook(spravaVasylyaStusa, 1);
oleksandra.placeOrder(order1);

const order2 = new Order(pesPatron);
order2.addBook(spravaVasylyaStusa, 10);
pesPatron.placeOrder(order2);

const review1 = new Review(spravaVasylyaStusa, oleksandra, 5, 'Неймовірно сильна книга. Рекомендую!');
spravaVasylyaStusa.addReview(review1);


console.log('\n--- РЕЗУЛЬТАТИ СИМУЛЯЦІЇ ---');

console.log('\nBOOKSTORE AND ITS INVENTORY:');
console.log(bookYeStore);

console.log('\nPUBLISHERS AND THEIR BOOKS:');
console.log(ksd);
console.log(vivat);

console.log('\nREGISTERED USERS AND THEIR ORDERS:');
console.log(JSON.stringify(oleksandra, null, 2));
console.log(JSON.stringify(pesPatron, null, 2));

console.log('\nREVIEWS FOR THE BOOK "Справа Василя Стуса":');
console.log(spravaVasylyaStusa.reviews);
