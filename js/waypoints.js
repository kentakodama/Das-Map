
import * from '../noframework.waypoints.min.js'

const enter1 = new Waypoint({
  element: document.getElementById('trigger-first-section'),
  handler: function() {
    handleTransition('EU');
  },
  offset: '40%'
})
const reverseEnter1 = new Waypoint({
  element: document.getElementById('reverse-enter-section-1'),
  handler: function() {
    handleMapColorUpdate('EU');
  },
  offset: '50%'
})

const enter2 = new Waypoint({
  element: document.getElementById('enter-section-2'),
  handler: function() {
    handleAccession('six')
  },
  offset: '40%'
})
const reverseEnter2 = new Waypoint({
  element: document.getElementById('reverse-enter-section-2'),
  handler: function() {
    handleAccession('six')
  },
  offset: '50%'
})

const enter3 = new Waypoint({
  element: document.getElementById('enter-section-3'),
  handler: function() {
    handleAccession('twelve')
  },
  offset: '40%'
})

const reverseEnter3 = new Waypoint({
  element: document.getElementById('reverse-enter-section-3'),
  handler: function() {
    handleAccession('twelve')
  },
  offset: '50%'
})

const enter4 = new Waypoint({
  element: document.getElementById('enter-section-4'),
  handler: function() {
    handleAccession('fifteen')
  },
  offset: '40%'
})
const reverseEnter4 = new Waypoint({
  element: document.getElementById('reverse-enter-section-4'),
  handler: function() {
    handleAccession('fifteen')
  },
  offset: '50%'
})


const enter5 = new Waypoint({
  element: document.getElementById('enter-section-5'),
  handler: function() {
    handleAccession('eastern')
  },
  offset: '40%'
})
const reverseEnter5 = new Waypoint({
  element: document.getElementById('reverse-enter-section-5'),
  handler: function() {
    handleAccession('eastern')
  },
  offset: '50%'
})

const enter6 = new Waypoint({
  element: document.getElementById('enter-section-6'),
  handler: function() {
    handleAccession('now')
  },
  offset: '40%'
})
const reverseEnter6 = new Waypoint({
  element: document.getElementById('reverse-enter-section-6'),
  handler: function() {
    handleAccession('now')
  },
  offset: '50%'
})
const enter7 = new Waypoint({
  element: document.getElementById('enter-section-7'),
  handler: function() {
    handleAccession('brexit')
  },
  offset: '40%'
})
const reverseEnter7 = new Waypoint({
  element: document.getElementById('reverse-enter-section-7'),
  handler: function() {
    handleAccession('brexit')
  },
  offset: '50%'
})
const enter8 = new Waypoint({
  element: document.getElementById('enter-section-8'),
  handler: function() {
    handleTransition('Euro-relation');
  },
  offset: '40%'
})
const reverseEnter8 = new Waypoint({
  element: document.getElementById('reverse-enter-section-8'),
  handler: function() {
    handleMapColorUpdate('Euro-relation');
  },
  offset: '50%'
})
const enter9 = new Waypoint({
  element: document.getElementById('enter-section-9'),
  handler: function() {
    handleTransition('Schengen');
  },
  offset: '40%'
})
const reverseEnter9 = new Waypoint({
  element: document.getElementById('reverse-enter-section-9'),
  handler: function() {
    handleMapColorUpdate('Schengen');
  },
  offset: '50%'
})
const enter10 = new Waypoint({
  element: document.getElementById('enter-section-10'),
  handler: function() {
    handleTransition('EEA');
  },
  offset: '40%'
})
const reverseEnter10 = new Waypoint({
  element: document.getElementById('reverse-enter-section-10'),
  handler: function() {
    handleMapColorUpdate('EEA');
  },
  offset: '50%'
})
const enter11 = new Waypoint({
  element: document.getElementById('enter-section-11'),
  handler: function() {
    handleTransition('CurrencyUnion');
  },
  offset: '40%'
})
const reverseEnter11 = new Waypoint({
  element: document.getElementById('reverse-enter-section-11'),
  handler: function() {
    handleMapColorUpdate('CurrencyUnion');
  },
  offset: '50%'
})
const enter12 = new Waypoint({
  element: document.getElementById('enter-section-12'),
  handler: function() {
    handleTransition('income');
  },
  offset: '40%'
})
const reverseEnter12 = new Waypoint({
  element: document.getElementById('reverse-enter-section-12'),
  handler: function() {
    handleTransition('income')
  },
  offset: '50%'
})
