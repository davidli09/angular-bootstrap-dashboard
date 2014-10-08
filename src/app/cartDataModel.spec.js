

'use strict';

describe('Factory: CartDataModel', function () {

  var CartDataModel, model;

  // load the service's module
  beforeEach(module('app'));

  // instantiate service
  beforeEach(inject(function (_CartDataModel_) {
    CartDataModel = _CartDataModel_;
  }));

  describe('the constructor', function() {
    beforeEach(function() {
      model = new CartDataModel();
    });

    it('should create cart with empty properties', function() {
      expect(model.items).toEqual([]);
      expect(model.total).toEqual(0);
      expect(model.qty).toEqual(0);
      expect(model.expItem).toEqual({});
      expect(model.cheapItem).toEqual({});
    });
  });

  describe('the methods with items', function() {
    beforeEach(function() {
      model = new CartDataModel();

      // let's populate cart with one item
      model.addItem({name: 'Apple', qty: 2, price: .55});
      model.addItem({name: 'Pear', qty: 5, price: .75});
      model.addItem({name: 'Banana', qty: 3, price: .35});
    });

    describe('the addItem method', function() {
      it('should add new item', function() {
        model.addItem({
          name: 'Orange',
          qty: 2,
          price: .75
        });

        expect(model.items.length).toEqual(4);
        expect(model.items[3].name).toEqual('Orange');
        expect(model.items[3].qty).toEqual(2);
        expect(model.items[3].price).toEqual(.75);
      });

      it('shoudl update existing item', function() {
        model.addItem({
          name: 'Pear',
          qty: 2,
          price: .67
        });

        expect(model.items.length).toEqual(3);
        expect(model.items[1].name).toEqual('Pear');
        expect(model.items[1].qty).toEqual(7);
        expect(model.items[1].price).toEqual(.73);
      });

    });

    describe('the removeItem method', function() {
      it('should remove one item', function() {
        model.removeItem({name: 'Pear'});

        expect(model.items.length).toEqual(2);
        expect(model.items[0].name).toEqual('Apple');
        expect(model.items[1].name).toEqual('Banana');
      });

      it('should not remove anything', function() {
        model.removeItem({name: 'Name_not_in_cart'});

        expect(model.items.length).toEqual(3);
        expect(model.items[0].name).toEqual('Apple');
        expect(model.items[1].name).toEqual('Pear');
        expect(model.items[2].name).toEqual('Banana');
      });

    });

    describe('the processItems method', function() {
      it('should calculate total', function() {
        expect(model.total).toEqual(5.90);
      });

      it('should calculate qty', function() {
        expect(model.qty).toEqual(10);
      });

      it('should set most expensive item', function() {
        expect(model.expItem.name).toEqual('Pear');
        expect(model.expItem.qty).toEqual(5);
        expect(model.expItem.price).toEqual(.75);
      });

      it('should set cheapest item', function() {
        expect(model.cheapItem.name).toEqual('Banana');
        expect(model.cheapItem.qty).toEqual(3);
        expect(model.cheapItem.price).toEqual(.35);
      });
    });

  });

});