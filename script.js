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
            $('#saleList').append(`<div class="bookItem" id="book-${book.id}" data-id="${book.id}"><div class="item-content"><text> ${book.name} - ${book.author} </text></div><div class="item-action"> <button onclick="sellBook(${book.id})" class="sale-btn" >Vendre</button> <button onclick="deleteBook(${book.id}, 'sale')" class="delete-btn">Supprimer</button></div></div>`);
        });

        soldBooks.forEach(function(book) {
            $('#soldList').append(`<div class="bookItem" id="book-${book.id}" data-id="${book.id}"><div class="item-content"><text> ${book.name} - ${book.author} </text></div><div class="item-action">  <button onclick="returnBook(${book.id})" class="sale-btn" >Retourner</button> <button onclick="deleteBook(${book.id}, 'sold')" class="delete-btn">Supprimer</button></div></div>`);
        });

        makeDraggable();
        makeDroppable();
    }

    function makeDraggable() {
        $('.bookItem').draggable({
            helper: 'clone',
            revert: 'invalid'
        });
    }

    function makeDroppable() {
        $('#soldList').droppable({
            accept: '.bookItem',
            drop: function(event, ui) {
                var id = ui.draggable.data('id');
                sellBook(id);
            }
        });

        $('#saleList').droppable({
            accept: '.bookItem',
            drop: function(event, ui) {
                var id = ui.draggable.data('id');
                returnBook(id);
            }
        });
    }

    window.sellBook = function(id) {
        var book = booksForSale.find(b => b.id === id);
        booksForSale = booksForSale.filter(b => b.id !== id);
        soldBooks.push(book);
        refreshLists();
    };

            window.returnBook = function(id) {
                var book = soldBooks.find(b => b.id === id);
                soldBooks = soldBooks.filter(b => b.id !== id);
                booksForSale.push(book);
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
        return false; // Prevent form submission
    };

    refreshLists();
});
