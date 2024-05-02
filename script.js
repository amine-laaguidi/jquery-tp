$(document).ready(function() {
    var booksForSale = [
        { id: 1, name: "JavaScript: The Good Parts", author: "Douglas Crockford", price: 20 },
        { id: 2, name: "Eloquent JavaScript", author: "Marijn Haverbeke", price: 15 }
    ];

    var soldBooks = [];

    function refreshLists() {
        $('#saleList').empty();
        $('#soldList').empty();

        booksForSale.forEach(function(book) {
            $('#saleList').append(`<div class="bookItem"><div class="item-content"><text> ${book.name} - ${book.author} </text></div><div class="item-action"> <button onclick="sellBook(${book.id})" class="sale-btn" >Vendre  </button> <button onclick="deleteBook(${book.id}, 'sale')" class="delete-btn">Supprimer</button></div></div>`);
        });

        soldBooks.forEach(function(book) {
            $('#soldList').append(`<div class="bookItem"><div class="item-content"><text> ${book.name} - ${book.author} </text></div><div class="item-action"> <button onclick="deleteBook(${book.id}, 'sold')" class="delete-btn">Supprimer</button></div></div>`);
            // $('#soldList').append(`<li>${book.name} - ${book.author} <button onclick="deleteBook(${book.id}, 'sold')">Delete</button></li>`);
        });
    }

    window.sellBook = function(id) {
        var book = booksForSale.find(b => b.id === id);
        booksForSale = booksForSale.filter(b => b.id !== id);
        soldBooks.push(book);
        refreshLists();
    };

    window.deleteBook = function(id, type) {
        if (type === 'sale') {
            booksForSale = booksForSale.filter(b => b.id !== id);
        } else {
            soldBooks = soldBooks.filter(b => b.id !== id);
        }
        refreshLists();
    };

    window.addBook = function() {
        var name = $('#bookName').val();
        var author = $('#author').val();
        var price = $('#price').val();
        var id = new Date().getTime(); // Simple unique ID generator

        booksForSale.push({ id: id, name: name, author: author, price: Number(price) });
        refreshLists();

        $('#bookName').val('');
        $('#author').val('');
        $('#price').val('');
    };

    refreshLists();
});
