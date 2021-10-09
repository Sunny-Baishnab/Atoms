AFRAME.registerComponent('atoms',{
  init:async function(){
    var compounds = await this.getCompounds()
    var barCodes = Object.keys(compounds)
    barCodes.map(barCode=>{
      var element = compounds[barCode]
      this.createAtoms(element)
    })
  },
  getCompounds:function(){
    return fetch("js/compundList.json")
    .then(atom=>{
      atom.json()
    })
    .then(data=>data)
  },
  getElementColor:function(){
    return fetch("js/elementColors.json")
    .then(color=>{
      color.json()
    })
    .then(data=>data)
  },
  createAtoms:async function(element){
    var elementName = element.element_name
    var barCodeValue = element.barCode_Value
    var numberOfElectrons = element.number_of_electrons
    var colors = await this.getElementColor()

    var scene = document.querySelector('a-scene')
    var marker = document.createElement('a-marker')
    marker.setAttribute('id',`marker-${barCodeValue}`)
    marker.setAttribute('type','barcode')
    marker.setAttribute('element_name',elementName)
    marker.setAttribute('value',barCodeValue)

    scene.appendChild(marker)

    var atom = document.createElement('a-entity')
    atom.setAttribute('id',`${elementName}-${barCodeValue}`)
    marker.appendChild(atom)

    var card = document.createElement('a-entity')
    card.setAttribute('id',`card-${elementName}`)
    card.setAttribute('geometry',{
      primitive:'plane',
      width:1,
      height:1
    })

    card.setAttribute('material',{
      src:`./assets/atom_cards/card_${elementName}.png`
    })
    card.setAttribute('position',{x:0,y:0,z:0})
    card.setAttribute('rotation',{x:-90,y:0,z:0})
    atom.appendChild(card)

    var nucleus = document.createElement('a-entity')
    nucleus.setAttribute('id',`nucleus-${elementName}`)
    nucleus.setAttribute('geometry',{
      primitive:'sphere',
      radius:0.2
    })
    nucleus.setAttribute('position',{x:0,y:1,z:0})
    nucleus.setAttribute('rotation',{x:0,y:0,z:0})
    nucleus.setAttribute('material','color',colors[elementName])
    

    var nucleusName = document.createElement("a-entity");
    nucleusName.setAttribute("id", `nucleus-name-${elementName}`);
    nucleusName.setAttribute("position", { x: 0, y: 0.21, z: -0.06 });
    nucleusName.setAttribute("rotation", { x: -90, y: 0, z: 0 });
    nucleusName.setAttribute("text", {
      font: "monoid",
      width: 3,
      color: "black",
      align: "center",
      value: elementName
    });

    nucleus.appendChild(nucleusName);

    atom.appendChild(nucleus)
  }
})