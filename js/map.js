
// init controller
var controller = new ScrollMagic.Controller();


const height = document.documentElement.clientHeight
const width = document.documentElement.clientWidth

const projection = d3.geoOrthographic()
.center([ 16, 30 ])
.translate([ width/2, height/2 ])
.scale([ width/1.07 ])
.rotate([-10, -20, 0 ]);


let europe = void 0;

const path = d3.geoPath().projection(projection);

const svg = d3.select('#map')
.append('svg')
.attr('height', height)
.attr('width', width)

//this creates the background
// by appending it before the 'g' map is rendered, it places it in the background
svg.append("rect")
.attr("width", "100%")
.attr("height", "100%")
.attr("fill", "#1E4675");


$(function () { // wait for document ready

  var tween = TweenMax.from("#animate", 0.5, {autoAlpha: 0, scale: 0.7});


  controller.scrollTo(function (newpos) {
    let constant = .12
    let distance = Math.abs(newpos - window.pageYOffset)
    if(distance < window.innerHeight) {
      constant = .8
    }
    let slides = distance/window.innerHeight
    let speed = slides * constant
    TweenMax.to(window, speed, {scrollTo: {y: newpos}});
  });


  //  bind scroll to anchor links
  const buttons = document.querySelectorAll('.link')
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function (e) {

      var pos = $(this).attr("data-position");

      if ($(pos).length > 0) {
        e.preventDefault();
      }
        // trigger scroll
        controller.scrollTo(`#${pos}`)
    }
    )
  }


  var headerScene = new ScrollMagic.Scene({triggerElement: "#header",triggerHook: 0})
          .setPin("#header")
          .addTo(controller);

  var scene1 = new ScrollMagic.Scene({triggerElement: "#header",triggerHook: 0})
          .setPin("#map")
          // .offset(-100)
          .addTo(controller);

  var scene2 = new ScrollMagic.Scene({triggerElement: "#map",triggerHook: 0, duration: 1})
          .setPin("#pin2")
          // .offset(-100)
          .addTo(controller);

  var scene33 = new ScrollMagic.Scene({triggerElement: "#enter-section-32",triggerHook: 0})
          .setPin("#pin33")
          .addTo(controller);


});


const switchLinkHighlight = (linkId, turnOn) => {

  let link = document.getElementById(linkId)

  if (turnOn) {
    link.classList.add('highlight-link')
  } else {
    link.classList.remove('highlight-link')
  }

}
const membership = {};

d3.csv("data/EuropeanStates.csv", function(data) {

  for (var i = 0; i < data.length; i++) {
    membership[data[i].State] = data[i]
  }
});

const generalColorScheme = {

  'EU': {
    'EU': '#f75413',
    'Candidate': 'red'
  },
  'Currency': {
    '€': '#f75413',
    'DKK': 'orange',
    'SEK': 'orange',
    'GBP': 'orange',
  },
  'Euro-relation': {
    'yes': '#f75413',
    'obligated':'#FBB135',
    'exempt': 'orange'
  },
  'NATO': {
    'NATO': '#f75413'
  },
  'CurrencyUnion': {
    'EUCU': '#f75413'
  },
  'Schengen': {
    'Schengen': '#f75413',
    'visa-free': 'red'
  },
  'EEA': {
    'EEA': '#f75413'
  }

}


const colorify = (data, cat) => {

  if(cat === 'blank') {return 'gray'}
  let stateName = data.properties.admin
  if (!membership[stateName]) { return 'gray' }

  let status = membership[stateName][`${cat}`]
  if (!generalColorScheme[`${cat}`][`${status}`]) { return 'gray' }
  return generalColorScheme[`${cat}`][`${status}`]

}


const handleTransition = (cate) => {
  let dur = 400;
  if(cate === 'income') {
    handleIncome(dur)
    return
  }

  handleMapColorUpdate(cate)

}



const handleMapColorUpdate = (category) => {

  d3.selectAll('path')
      .attr('fill', (d) => colorify(d, category))
}

const adjustIncome = (realIncome) => {

  if (realIncome > 50000) { realIncome = 50000 }
  return realIncome
}

const handleIncome = (duration) => {

  const colorbyIncome = d3.scaleLinear().domain([100, 50000]).range(['#FBB135', 'red']);

  d3.selectAll('path')
      .attr('fill', (d) => {
        let stateName = d.properties.admin
        if (!membership[stateName]) { return '#FBB135' }
        let status = membership[stateName]['GNI']
        // console.log(parseInt(status.split(',').join('')));
        let number = parseInt(status.split(',').join(''))
        let adjusted = adjustIncome(number)
        return colorbyIncome(adjusted)

      })
}

const handleAccession = (stage) => {
  d3.selectAll('path')
      .attr('fill', (d) => accessionColorScheme(d, stage ))
}


const accessionColorScheme = (data, stage) => {

  let stateName = data.properties.admin
  if (!membership[stateName]) { return 'gray' }

  let year = parseInt(membership[stateName]['Year-joined']);

  switch (stage) {
    case 'eu':{
      if (year) {
        return '#f75413'
      } else {
        return 'gray'
      }
    }
    case 'six': {
      if(year === 1957) {
        return '#f75413'
      } else {
        return 'gray'
      }
    }
    case 'twelve': {
      if(year === 1957) {
        return '#f75413'
      } else if (year > 1957 && year <= 1992) {
        return '#FBB135'
      } else {
        return 'gray'
      }
    }
    case 'fifteen': {
      if(year <= 1992) {
        return '#f75413';
      } else if (year === 1995) {
        return '#FBB135'
      } else {
        return 'gray'
      }
    }
    case 'eastern': {
      if(year <= 1995) {
        return '#f75413';
      } else if (year === 2004) {
        return '#FBB135'
      } else {
        return 'gray'
      }
    }
    case 'now':{
      if(year <= 2004) {
        return '#f75413';
      } else if (year) {
        return '#FBB135'
      } else {
        return 'gray'
      }
    }
    case 'brexit':{
      if(stateName === 'United Kingdom') {
        return 'orange';
      } else if (year) {
        return '#f75413'
      } else {
        return 'gray'
      }
    }
    case 'reluctant':{
      if(membership[stateName]['EU'] === 'reluctant') {
        return 'orange';
      } else if (year) {
        return '#f75413'
      } else {
        return 'gray'
      }
    }
    case 'candidates':{

      if(membership[stateName]['EU'] === 'Candidate') {
        return 'orange';
      } else if (year) {
        return '#f75413'
      } else {
        return 'gray'
      }
    }
    default:

  }

}

const handleEuro = (cate) => {
  d3.selectAll('path')
      .attr('fill', (d) => euroColorScheme(d, cate))
}

const euroColorScheme = (data, slide) => {
  let stateName = data.properties.admin
  if (!membership[stateName]) { return 'gray' }

  // let currency = membership[stateName]['Currency'];
  let euroRelation = membership[stateName]['Euro-relation']
  let euStatus = membership[stateName]['EU']
  // if (!year) { return 'gray' }

  switch (slide) {
    case 'eu':{
      if (euStatus === 'EU') {
        return '#f75413'
      } else {
        return 'gray'
      }
    }
    case 'eurozone':{
      if (euroRelation === 'yes') {
        return '#f75413'
      } else {
        return 'gray'
      }
    }

    case 'obligated':{
      if (euroRelation === 'yes') {
        return '#f75413'
      } else if (euroRelation === 'obligated') {
        return 'orange'
      } else {
        return 'gray'
      }
    }

    case 'exempt':{
      if (euroRelation === 'yes') {
        return '#f75413'
      } else if (euroRelation === 'obligated') {
        return 'gray'
      } else if (euroRelation === 'exempt') {
        return 'orange'
      } else {
        return 'gray'
      }
    }
  }
}

const debtTable = {}

d3.csv("data/debt.csv", function(data) {

  for (var i = 0; i < data.length; i++) {
    debtTable[data[i].country] = data[i]
  }
});


const handleDebt = (yr, piigs) => {
  d3.selectAll('path')
      .attr('fill', (d) => colorByDebt(d, yr, piigs))
}

const debtLevelColorScheme = d3.scaleLinear().domain([0, 200]).range(['yellow', 'red']);
const debtPercentChangeColorScheme = d3.scaleLinear().domain([0, 160]).range(['yellow', 'red']);

const colorByDebt = (data, year, piigs) => {
  let stateName = data.properties.admin
  if(!debtTable[stateName]) { return 'gray' }

  if(piigs) {
    return debtPercentChangeColorScheme(debtTable[`${stateName}`]['percent-change'])
  }

  return debtLevelColorScheme(debtTable[`${stateName}`][`${year}`])
}


const handleSchengen = (status) => {
  d3.selectAll('path')
      .attr('fill', (d) => schengenColorScheme(d, status))

}

const schengenColorScheme = (data, status) => {
  let stateName = data.properties.admin
  if(!membership[stateName]) { return 'gray' }

  let schengenStatus = membership[stateName]['Schengen']
  let isEuMember = membership[stateName]['EU'] === 'EU'
  switch (status) {
    case 'member': {
      if(schengenStatus === 'Schengen') {
        return '#f75413'
      } else {
        return 'gray'
      }
    }

    case 'exempt': {
      if(schengenStatus === 'Schengen') {
        return '#f75413'
      } else if(!schengenStatus && isEuMember) {
        return 'orange'
      } else {
        return 'gray'
      }
    }
    case 'nonEU': {
      if(schengenStatus === 'Schengen' && isEuMember) {
        return '#f75413'
      } else if(schengenStatus === 'Schengen' && !isEuMember) {
        return 'orange'
      } else {
        return 'gray'
      }
    }
    case 'possibleExpansion': {
      if(schengenStatus === 'Schengen') {
        return '#f75413'
      } else if(schengenStatus == 'EU visa-free') {
        return 'orange'
      } else {
        return 'gray'
      }
    }
  }
}


const migrationTable = {}

d3.csv("data/migration.csv", function(data) {

  for (var i = 0; i < data.length; i++) {
    migrationTable[data[i].country] = data[i]
  }
});

const entryColoring = d3.scaleLinear().domain([10000, 250000]).range(['#fd8828', 'red']);
const asylumTotalColoring = d3.scaleLinear().domain([0, 500000]).range(['#FED130', 'red']);
const asylumByPopColoring = d3.scaleLinear().domain([0, 150]).range(['#F9A641', 'red']);



const handleMigration = (category) => {

  d3.selectAll('path')
      .attr('fill', (d) => migrationColorScheme(d, category))
}

const migrationColorScheme = (data, category) => {
  let stateName = data.properties.admin
  if(!membership[stateName]) { return 'gray' }
  if(!migrationTable[`${stateName}`]) { return 'gray' }

  let value = parseInt(migrationTable[`${stateName}`][`${category}`])
  switch (category) {
    case 'entry': {
      if (!value) {return '#FDA429'}
      return entryColoring(value)
    }
    case 'asylumTotal': {
      return asylumTotalColoring(value)
    }

    case 'asylumByPop': {
      return asylumByPopColoring(value)
    }
  }
}

const natoMembers = {};

d3.csv("data/nato.csv", function(data) {

  for (var i = 0; i < data.length; i++) {
    natoMembers[data[i].country] = data[i]
  }

});


const handleNato = (category) => {

  d3.selectAll('path')
      .attr('fill', (d) => natoColorScheme(d, category))
}

const natoColorScheme = (data, category) => {
  let stateName = data.properties.admin
  if(category === 'ukraine' && stateName === 'Ukraine') { return 'orange' }
  if(!membership[`${stateName}`]) { return 'gray' }
  if(!natoMembers[`${stateName}`]) { return 'gray' }

  let year = parseInt(natoMembers[stateName]['joined']);

  switch (category) {
    case 'members': {
      return '#f75413'
    }
    case 'original': {
      if(year === 1949) {
        return '#f75413'
      } else {
        return 'gray'
      }
    }
    case 'expansion': {
      if(year === 1949) {
        return '#f75413'
      } else if(year > 1949 && year < 1999) {
        return 'orange'
      } else {
        return 'gray'
      }
    }
    case 'eastern': {
      if(year < 1999) {
        return '#f75413'
      } else if(year >= 1999) {
        return 'orange'
      } else {
        return 'gray'
      }
    }
    case 'ukraine': {
      if(year) {
        return '#f75413'
      } else if (stateName === 'Ukraine') {
        return 'orange'
      } else {
        return 'gray'
      }
    }

  }

}



const showModal = function(data) {
     var modal = document.getElementById('infoModal');

     modal.style.left = event.pageX +'px';
     modal.style.top = event.pageY + 'px';
     modal.style.display = 'block';
     modal.style.opacity = .8;

     modal.innerHTML = data.properties.admin;
};

const hideModal = () => {
  console.log('hidiing modal');

  var modal = document.getElementById('infoModal');
  modal.style.display = 'none';
  modal.style.opacity = 0;

  modal.innerHTML = '';
}

//must have window events here not on the country
window.addEventListener('scroll', () => hideModal())

d3.json("data/region_un_Europe_subunits.json", function(error, data) {

   const countries = data.features

   map = svg.append('g').attr('class', 'boundary');

   europe = map.selectAll('path').data(countries) //must always be features regardless of what it says in json

  europe.enter()
    .append('path')
    .attr('d', path)
    .attr('stroke', 'white')
    .attr('stroke-width', 0.6)
    .attr('fill', (d) => 'gray')
    .on('mouseenter', (d) => showModal(d))
    .on('mouseout', () => hideModal())

  europe.exit().remove();
})

let runCycle = true

function cycleHighlight(delay) {
    if (!runCycle) { return }
    var x = 0;
    var intervalID = window.setInterval(function () {

      let nations = ['Germany', 'Ukaine', 'Greece', 'Italy', 'Romania', 'Czech Republic', 'Portugal', 'France', 'Sweden', 'Slovenia', 'Spain', 'Belarus' ]

      d3.selectAll('path')
          .attr('fill', (d) => {
            if(d.properties.admin == nations[x]) {
              return 'orange';
            } else {
              return 'gray'
            }
          })

       if (++x === nations.length) {
         runCycle = false;
           window.clearInterval(intervalID);
           d3.selectAll('path')
               .attr('fill', 'gray')
       }
    }, delay);
}



let el = document.getElementById('trigger-first-section')
console.log(el);
const enter1 = new Waypoint({
  element: document.getElementById('trigger-first-section'),
  handler: function() {
    cycleHighlight(120);

  }
  // offset: '40%'
})
const reverseEnter1 = new Waypoint({
  element: document.getElementById('reverse-enter-section-1'),
  handler: function() {
    handleMapColorUpdate('blank');
    switchLinkHighlight('welcome-link', true);
    switchLinkHighlight('eu-link', false);
  },
  offset: '50%'
})

const enter2 = new Waypoint({
  element: document.getElementById('enter-section-2'),
  handler: function() {
    handleAccession('eu');
    switchLinkHighlight('welcome-link', false);
    switchLinkHighlight('eu-link', true);
  },
  offset: '30%'
})
const reverseEnter2 = new Waypoint({
  element: document.getElementById('reverse-enter-section-2'),
  handler: function() {
    handleAccession('eu')
  },
  offset: '50%'
})

const enter3 = new Waypoint({
  element: document.getElementById('enter-section-3'),
  handler: function() {
    handleAccession('candidates')
  },
  offset: '30%'
})

const reverseEnter3 = new Waypoint({
  element: document.getElementById('reverse-enter-section-3'),
  handler: function() {
    handleAccession('candidates')
  },
  offset: '50%'
})

const enter4 = new Waypoint({
  element: document.getElementById('enter-section-4'),
  handler: function() {
    handleAccession('reluctant');
  },
  offset: '30%'
})
const reverseEnter4 = new Waypoint({
  element: document.getElementById('reverse-enter-section-4'),
  handler: function() {
    handleAccession('reluctant');
  },
  offset: '50%'
})


const enter5 = new Waypoint({
  element: document.getElementById('enter-section-5'),
  handler: function() {
    handleAccession('eu')
  },
  offset: '30%'
})
const reverseEnter5 = new Waypoint({
  element: document.getElementById('reverse-enter-section-5'),
  handler: function() {
    handleAccession('eu')
  },
  offset: '50%'
})

const enter6 = new Waypoint({
  element: document.getElementById('enter-section-6'),
  handler: function() {
    handleAccession('six')
  },
  offset: '30%'
})
const reverseEnter6 = new Waypoint({
  element: document.getElementById('reverse-enter-section-6'),
  handler: function() {
    handleAccession('six')
  },
  offset: '50%'
})
const enter7 = new Waypoint({
  element: document.getElementById('enter-section-7'),
  handler: function() {
    handleAccession('twelve')
  },
  offset: '30%'
})
const reverseEnter7 = new Waypoint({
  element: document.getElementById('reverse-enter-section-7'),
  handler: function() {
    handleAccession('twelve')
  },
  offset: '50%'
})
const enter8 = new Waypoint({
  element: document.getElementById('enter-section-8'),
  handler: function() {
    handleAccession('fifteen')
  },
  offset: '30%'
})
const reverseEnter8 = new Waypoint({
  element: document.getElementById('reverse-enter-section-8'),
  handler: function() {
    handleAccession('fifteen')
  },
  offset: '50%'
})
const enter9 = new Waypoint({
  element: document.getElementById('enter-section-9'),
  handler: function() {
    handleAccession('eastern')
  },
  offset: '30%'
})
const reverseEnter9 = new Waypoint({
  element: document.getElementById('reverse-enter-section-9'),
  handler: function() {
    handleAccession('eastern')
  },
  offset: '50%'
})
const enter10 = new Waypoint({
  element: document.getElementById('enter-section-10'),
  handler: function() {
    handleAccession('now')
  },
  offset: '30%'
})
const reverseEnter10 = new Waypoint({
  element: document.getElementById('reverse-enter-section-10'),
  handler: function() {
    handleAccession('now')
  },
  offset: '50%'
})
const enter11 = new Waypoint({
  element: document.getElementById('enter-section-11'),
  handler: function() {
    handleAccession('brexit')
  },
  offset: '30%'
})
const reverseEnter11 = new Waypoint({
  element: document.getElementById('reverse-enter-section-11'),
  handler: function() {
    handleAccession('brexit')
    switchLinkHighlight('eu-link', true);
    switchLinkHighlight('eurozone-link', false);
  },
  offset: '50%'
})
const enter12 = new Waypoint({
  element: document.getElementById('enter-section-12'),
  handler: function() {
    handleEuro('eu');
    switchLinkHighlight('eu-link', false);
    switchLinkHighlight('eurozone-link', true);
  },
  offset: '30%'
})
const reverseEnter12 = new Waypoint({
  element: document.getElementById('reverse-enter-section-12'),
  handler: function() {
    handleEuro('eu');
  },
  offset: '50%'
})
const enter13 = new Waypoint({
  element: document.getElementById('enter-section-13'),
  handler: function() {
    handleEuro('eurozone')
  },
  offset: '30%'
})
const reverseEnter13 = new Waypoint({
  element: document.getElementById('reverse-enter-section-13'),
  handler: function() {
    handleEuro('eurozone')
  },
  offset: '50%'
})
const enter14 = new Waypoint({
  element: document.getElementById('enter-section-14'),
  handler: function() {
    handleEuro('obligated')
  },
  offset: '30%'
})
const reverseEnter14 = new Waypoint({
  element: document.getElementById('reverse-enter-section-14'),
  handler: function() {
    handleEuro('obligated')        },
  offset: '50%'
})
const enter15 = new Waypoint({
  element: document.getElementById('enter-section-15'),
  handler: function() {
    handleEuro('exempt');
  },
  offset: '30%'
})
const reverseEnter15 = new Waypoint({
  element: document.getElementById('reverse-enter-section-15'),
  handler: function() {
    handleEuro('exempt');
    switchLinkHighlight('eurozone-link', true);
    switchLinkHighlight('eurocrisis-link', false);
  },
  offset: '50%'
})
const enter16 = new Waypoint({
  element: document.getElementById('enter-section-16'),
  handler: function() {
    handleEuro('eurozone');
    switchLinkHighlight('eurocrisis-link', true);
    switchLinkHighlight('eurozone-link', false);
  },
  offset: '30%'
})
const reverseEnter16 = new Waypoint({
  element: document.getElementById('reverse-enter-section-16'),
  handler: function() {
    handleEuro('eurozone')        },
  offset: '50%'
})
const enter17 = new Waypoint({
  element: document.getElementById('enter-section-17'),
  handler: function() {
    handleDebt(2008);
  },
  offset: '30%'
})
const reverseEnter17 = new Waypoint({
  element: document.getElementById('reverse-enter-section-17'),
  handler: function() {
    handleDebt(2008);
  },
  offset: '50%'
})
const enter18 = new Waypoint({
  element: document.getElementById('enter-section-18'),
  handler: function() {
    handleDebt(2016);
  },
  offset: '30%'
})
const reverseEnter18 = new Waypoint({
  element: document.getElementById('reverse-enter-section-18'),
  handler: function() {
    handleDebt(2016);
  },
  offset: '50%'
})
const enter19 = new Waypoint({
  element: document.getElementById('enter-section-19'),
  handler: function() {
    handleDebt(2016, true);
  },
  offset: '30%'
})
const reverseEnter19 = new Waypoint({
  element: document.getElementById('reverse-enter-section-19'),
  handler: function() {
    handleDebt(2016, true);
    switchLinkHighlight('eurocrisis-link', true)
    switchLinkHighlight('Schengen-link', false);
  },
  offset: '50%'
})
const enter20 = new Waypoint({
  element: document.getElementById('enter-section-20'),
  handler: function() {
    handleSchengen('member');
    switchLinkHighlight('Schengen-link', true)
    switchLinkHighlight('eurocrisis-link', false)
  },
  offset: '30%'
})
const reverseEnter20 = new Waypoint({
  element: document.getElementById('reverse-enter-section-20'),
  handler: function() {
    handleSchengen('member');
  },
  offset: '50%'
})
const enter21 = new Waypoint({
  element: document.getElementById('enter-section-21'),
  handler: function() {
    handleSchengen('exempt');

  },
  offset: '30%'
})
const reverseEnter21 = new Waypoint({
  element: document.getElementById('reverse-enter-section-21'),
  handler: function() {
    handleSchengen('exempt');
  },
  offset: '50%'
})
const enter22 = new Waypoint({
  element: document.getElementById('enter-section-22'),
  handler: function() {
    handleSchengen('nonEU');
  },
  offset: '30%'
})
const reverseEnter22 = new Waypoint({
  element: document.getElementById('reverse-enter-section-22'),
  handler: function() {
    handleSchengen('nonEU')
  },
  offset: '50%'
})
const enter23 = new Waypoint({
  element: document.getElementById('enter-section-23'),
  handler: function() {
    handleSchengen('possibleExpansion');
  },
  offset: '30%'
})
const reverseEnter23 = new Waypoint({
  element: document.getElementById('reverse-enter-section-23'),
  handler: function() {
    handleSchengen('possibleExpansion');
  },
  offset: '50%'
})
const enter24 = new Waypoint({
  element: document.getElementById('enter-section-24'),
  handler: function() {
    handleSchengen('member');

  },
  offset: '30%'
})
const reverseEnter24 = new Waypoint({
  element: document.getElementById('reverse-enter-section-24'),
  handler: function() {
    handleSchengen('member');
    switchLinkHighlight('Schengen-link', true)
    switchLinkHighlight('migration-link', false)
  },
  offset: '50%'
})
const enter25 = new Waypoint({
  element: document.getElementById('enter-section-25'),
  handler: function() {
    handleMigration('entry');
    switchLinkHighlight('migration-link', true);
    switchLinkHighlight('Schengen-link', false);
  },
  offset: '30%'
})
const reverseEnter25 = new Waypoint({
  element: document.getElementById('reverse-enter-section-25'),
  handler: function() {
    handleMigration('entry');
  },
  offset: '50%'
})
const enter26 = new Waypoint({
  element: document.getElementById('enter-section-26'),
  handler: function() {
    handleMigration('asylumTotal');
  },
  offset: '30%'
})
const reverseEnter26 = new Waypoint({
  element: document.getElementById('reverse-enter-section-26'),
  handler: function() {
    handleMigration('asylumTotal');
  },
  offset: '50%'
})
const enter27 = new Waypoint({
  element: document.getElementById('enter-section-27'),
  handler: function() {
    handleMigration('asylumByPop')
  },
  offset: '30%'
})
const reverseEnter27 = new Waypoint({
  element: document.getElementById('reverse-enter-section-27'),
  handler: function() {
    handleMigration('asylumByPop');
    switchLinkHighlight('migration-link', true);
    switchLinkHighlight('nato-link', false);

  },
  offset: '50%'
})
const enter28 = new Waypoint({
  element: document.getElementById('enter-section-28'),
  handler: function() {
    handleNato('members');
    switchLinkHighlight('nato-link', true);
    switchLinkHighlight('migration-link', false);

  },
  offset: '30%'
})
const reverseEnter28 = new Waypoint({
  element: document.getElementById('reverse-enter-section-28'),
  handler: function() {
    handleNato('members');
  },
  offset: '50%'
})
const enter29 = new Waypoint({
  element: document.getElementById('enter-section-29'),
  handler: function() {
    handleNato('original')
  },
  offset: '30%'
})
const reverseEnter29 = new Waypoint({
  element: document.getElementById('reverse-enter-section-29'),
  handler: function() {
    handleNato('original');
  },
  offset: '50%'
})
const enter30 = new Waypoint({
  element: document.getElementById('enter-section-30'),
  handler: function() {
    handleNato('expansion');
  },
  offset: '30%'
})
const reverseEnter30 = new Waypoint({
  element: document.getElementById('reverse-enter-section-30'),
  handler: function() {
    handleNato('expansion');
  },
  offset: '50%'
})
const enter31 = new Waypoint({
  element: document.getElementById('enter-section-31'),
  handler: function() {
    handleNato('eastern');
  },
  offset: '30%'
})
const reverseEnter31 = new Waypoint({
  element: document.getElementById('reverse-enter-section-31'),
  handler: function() {
    handleNato('eastern');
  },
  offset: '50%'
})
const enter32 = new Waypoint({
  element: document.getElementById('enter-section-32'),
  handler: function() {
    handleNato('ukraine');
  },
  offset: '30%'
})
const reverseEnter32 = new Waypoint({
  element: document.getElementById('reverse-enter-section-32'),
  handler: function() {
    handleNato('ukraine');
    switchLinkHighlight('nato-link', true);
    // switchLinkHighlight('about-link', false);
  },
  offset: '50%'
})
