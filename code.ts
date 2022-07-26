// figma.showUI(__html__);

// Receive the drop event from the UI


// figma.ui.onmessage = (message) => {
//   console.log(message)
//   if (message.type === 'update') {
//     const currentSelection = figma.currentPage.selection
//     console.log('figma.currentPage.selection--------->')
//     console.log(currentSelection)
//   } else if (message.type === 'logRoot') {
//     console.log('figma.root--------->')
//     console.log(figma.root)
//   } else if (message.type === 'logPage') {
//     console.log('figma.currentPage--------->')
//     console.log(figma.currentPage)
//   }
// }

// This plugin counts the number of layers, ignoring instance sublayers,
// in the document
// let count = 0
// function traverse(node) {
//   if ("children" in node) {
//     count++
//     if (node.type !== "INSTANCE") {
//       for (const child of node.children) {
//         traverse(child)
//       }
//     }
//   }
// }
// traverse(figma.root) // start the traversal at the root
// console.log(count)
// figma.closePlugin()


/* traverse node */
// function* traverseGen(node) {
//   yield node
//   if ('children' in node) {
//     if (node.type !== 'INSTANCE') {
//       for (const child of node.children) {
//         yield* traverseGen(child)
//       }
//     }
//   }
// }
// for (const node of traverseGen(figma.currentPage)) {
//   console.log(node)
// }


/* parameters */
figma.parameters.on('input', ({ parameters, key, query, result }: ParameterInputEvent) => {
  console.log(`parameters: ${parameters}, key: ${key}, query: ${query}, result: ${result}`)
  switch (key) {
    case 'weapon':
      const weapons = ['AK47', 'M16A4', 'M416', 'MP5', 'UZI']
      result.setSuggestions(weapons.filter(s => s.includes(query)))
      break
    default:
      return
  }
})


figma.on('run', ({ parameters }: RunEvent) => {
  figma.showUI(__html__)

  if (parameters && parameters.weapon) {
    figma.ui.postMessage({
      weapon: parameters.weapon
    })
  }
})

figma.ui.onmessage = (message) => {
  console.log(message)
  if (message.type === 'update') {
    const currentSelection = figma.currentPage.selection
    console.log('figma.currentPage.selection--------->')
    console.log(currentSelection)
  } else if (message.type === 'logRoot') {
    console.log('figma.root--------->')
    console.log(figma.root)
  } else if (message.type === 'logPage') {
    console.log('figma.currentPage--------->')
    console.log(figma.currentPage)
  } else if (message.type === 'logFills') {
    if ((figma.currentPage.selection[0] as GeometryMixin).fills) {
      console.log(`figma.currentPage.selection[0].fills`)
      console.log((figma.currentPage.selection[0] as GeometryMixin).fills);
    }


  }
}
