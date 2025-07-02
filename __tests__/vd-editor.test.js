const initVDEditor = require('../js/vd-editor.js');

function createGoStub() {
  class GraphLinksModel {
    constructor(nodeDataArray = [], linkDataArray = []) {
      this.nodeDataArray = nodeDataArray;
      this.linkDataArray = linkDataArray;
    }
    toJson() {
      return JSON.stringify({
        nodeDataArray: this.nodeDataArray,
        linkDataArray: this.linkDataArray,
      });
    }
  }

  class Diagram {
    constructor(id, opts) {
      this.id = id;
      this.model = opts.model;
      this.toolManager = { clickCreatingTool: {} };
    }
    addModelChangedListener(fn) {
      this.listener = fn;
    }
  }

  const go = {
    Spot: { Center: 'Center' },
    Point: { parse: v => v, stringify: v => v },
    Diagram: 'Diagram',
    Node: 'Node',
    Link: 'Link',
    Shape: 'Shape',
    TextBlock: 'TextBlock',
    Binding: function() { this.makeTwoWay = () => this; },
    GraphLinksModel,
    GraphObject: {
      make(type, arg1, opts) {
        if (type === 'Diagram' || type === go.Diagram) {
          return new Diagram(arg1, opts);
        }
        return {};
      },
    },
  };

  return go;
}

beforeEach(() => {
  document.body.innerHTML = '<textarea name="vd_diagram_data"></textarea><div id="vd-editor"></div>';
  global.go = createGoStub();
});

test('diagram JSON persists to textarea on change', () => {
  const diagram = initVDEditor();
  diagram.model.nodeDataArray.push({ key: 1, text: 'Hello' });
  diagram.listener({ isTransactionFinished: true });
  const textarea = document.querySelector('textarea[name="vd_diagram_data"]');
  expect(JSON.parse(textarea.value)).toEqual({
    nodeDataArray: [{ key: 1, text: 'Hello' }],
    linkDataArray: [],
  });
});
