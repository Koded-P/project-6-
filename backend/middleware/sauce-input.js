module.exports = (req, res, next) => {
    //if this is the POST route 
    if (JSON.parse(req.body.sauce !== undefined)) {
      const sauce = JSON.parse(req.body.sauce);
      let { name, manufacturer, description, mainPepper } = sauce;
      let trimedTab = [];
  
      function toTrim(...string) {
        trimedTab = string.map((elt) => elt.trim());
      }
      toTrim(name, manufacturer, description, mainPepper);
  
      // Verify the number of characters 
      const hasThreeCharacters = (currentValue) => currentValue.length >= 3;
      if (trimedTab.every(hasThreeCharacters)) {
        next();
      } else {
        throw new Error("All fields must be atleast 3 characters long");
      }
    } else {
      // if this is the PUT route 
      const sauce = req.body;
      let { name, manufacturer, description, mainPepper } = sauce;
      let trimedTab = [];
  
      function toTrim(...string) {
        trimedTab = string.map((elt) => elt.trim());
      }
      toTrim(name, manufacturer, description, mainPepper);
  
      // Verifty the number of characters 
      const hasThreeCharacters = (currentValue) => currentValue.length >= 3;
      if (trimedTab.every(hasThreeCharacters)) {
        next();
      } else {
        throw new Error("All fields must be atleast 3 characters long");
      }
    }
  };