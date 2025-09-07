const useCart = (function() {
  // Private variables
  const STORAGE_KEY = 'shopping_cart';
  
  /**
   * Load cart data from localStorage
   * @returns {Array} Array of cart items
   */
  const _loadCart = () => {
    try {
      const storedCart = localStorage.getItem(STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error('Failed to load cart from cache:', error);
      return [];
    }
  };
  
  /**
   * Save cart data to localStorage
   * @param {Array} cartItems - Array of items in the cart
   */
  const _saveCart = (cartItems) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to save cart to cache:', error);
    }
  };
  
  // Public methods
  return {
    /**
     * Get all items in the cart
     * @returns {Array} Array of cart items
     */
    getItems: function() {
      return _loadCart();
    },
    
    /**
     * Add an item to the cart
     * @param {Object} item - The product to add to cart
     * @param {number} quantity - Quantity to add (default: 1)
     * @returns {Array} Updated cart items
     */
    addItem: function(item, quantity = 1) {
      if (!item || !item.id) {
        console.error('Cannot add item: Invalid item data');
        return _loadCart();
      }
      
      const cartItems = _loadCart();
      const existingItemIndex = cartItems.findIndex(i => i.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        cartItems[existingItemIndex].quantity += quantity;
      } else {
        // Add new item with quantity
        cartItems.push({ ...item, quantity });
      }
      
      _saveCart(cartItems);
      return cartItems;
    },
    
    /**
     * Remove an item from the cart
     * @param {string|number} itemId - ID of the item to remove
     * @returns {Array} Updated cart items
     */
    removeItem: function(itemId) {
      const cartItems = _loadCart().filter(item => item.id !== itemId);
      _saveCart(cartItems);
      return cartItems;
    },
    
    /**
     * Update the quantity of an item in the cart
     * @param {string|number} itemId - ID of the item to update
     * @param {number} newQuantity - New quantity value
     * @returns {Array} Updated cart items
     */
    updateItemQuantity: function(itemId, newQuantity) {
      if (newQuantity <= 0) {
        return this.removeItem(itemId);
      }
      
      const cartItems = _loadCart();
      const itemIndex = cartItems.findIndex(item => item.id === itemId);
      
      if (itemIndex !== -1) {
        cartItems[itemIndex].quantity = newQuantity;
        _saveCart(cartItems);
      }
      
      return cartItems;
    },
    
    /**
     * Get a specific item from the cart
     * @param {string|number} itemId - ID of the item to get
     * @returns {Object|null} Cart item or null if not found
     */
    getItem: function(itemId) {
      const items = _loadCart();
      return items.find(item => item.id === itemId) || null;
    },
    
    /**
     * Clear all items from the cart
     * @returns {Array} Empty array
     */
    clearCart: function() {
      _saveCart([]);
      return [];
    },
    
    /**
     * Calculate the total number of items in the cart
     * @returns {number} Total quantity of all items
     */
    getCartCount: function() {
      return _loadCart().reduce((total, item) => total + item.quantity, 0);
    },
    
    /**
     * Calculate the total price of items in the cart
     * @returns {number} Total price
     */
    getCartTotal: function() {
    return _loadCart().reduce((total, item) => {
      const price = item.onSale ? item.discountedPrice || 0 : item.price || 0;
      return total + (price * item.quantity);
    }, 0);
    },
    
    /**
     * Check if an item exists in the cart
     * @param {string|number} itemId - ID of the item to check
     * @returns {boolean} True if item exists in cart
     */
    hasItem: function(itemId) {
      return _loadCart().some(item => item.id === itemId);
    }
  };
})();

export default useCart;