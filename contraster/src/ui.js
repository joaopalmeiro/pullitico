import './ui.css';

function updateScores(id, score) {
  const element = document.getElementById(id);

  element.className = score;
  element.textContent = score;

  return element;
}

function changeText(id, text) {
  const element = document.getElementById(id);

  element.textContent = text;

  return element;
}

function changeColor(classname, color) {
  const elements = document.getElementsByClassName(classname);

  for (let i = 0; i < elements.length; i++) {
    if (elements[i].localName === 'div') {
      elements[i].style = `background-color: ${color};`;
    } else {
      elements[i].style = `color: ${color};`;
    }
  }
}

window.onmessage = async (event) => {
  const message = event.data.pluginMessage;

  if (message.type === 'selectionChange') {
    changeColor('background-color', message.background);
    changeColor('foreground-color', message.foreground);
    changeText('contrast', message.contrast);
    changeText('fg-value', message.foreground);
    changeText('bg-value', message.background);
    updateScores('normal-text-score', message.scores.normalText);
    updateScores('large-text-score', message.scores.largeText);
  }
};

document.getElementById('swap').onclick = () => {
  parent.postMessage({ pluginMessage: { type: 'swap' } }, '*');
};
