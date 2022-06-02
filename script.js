const box = document.querySelector(".box");
const handles = document.querySelectorAll(".box-handle:not(.box-handle--center)");
const centerHandle = document.querySelector(".box-handle--center");
const step = 40

const getPositionValue = (direction, rect, origin, current) => {
  switch (direction) {
    case 'north':
      return `${Math.round((rect.y - (origin - current)) / step) * step}px`
    case 'west':
      return `${Math.round((rect.x - (origin - current)) / step) * step}px`;
  }
}

const getSizeValue = (axis, rect, origin, current) => {
  switch (axis) {
    case '+x':
      return `${Math.round((rect.width - (origin - current)) / step) * step}px`
    case '-x':
      return `${Math.round((rect.width + (origin - current)) / step) * step}px`
    case '+y':
      return `${Math.round((rect.height + (origin - current)) / step) * step}px`
    case '-y':
      return `${Math.round((rect.height - (origin - current)) / step) * step}px`;
  }
}

/**
 * Handle moving
 */
centerHandle.addEventListener("mousedown", (e) => {
  const rect = box.getBoundingClientRect();
  const originTop = e.clientY;
  const originLeft = e.clientX;

  const startMoving = (e) => {
    box.style.top = `${Math.round((rect.y - (originTop - e.clientY)) / step) * step}px`;
    box.style.left = `${Math.round((rect.x - (originLeft - e.clientX)) / step) * step}px`;
  };

  const stopMoving = () => {
    document.removeEventListener("mousemove", startMoving);
    document.removeEventListener("mouseup", stopMoving);
  };

  document.addEventListener("mousemove", startMoving);
  document.addEventListener("mouseup", stopMoving);
});

/**
 * Handle resizing
 */
handles.forEach((handle) => {
  handle.addEventListener("mousedown", (e) => {
    const rect = box.getBoundingClientRect();
    const originTop = e.clientY;
    const originLeft = e.clientX;
    const currentTargetClass = e.target.classList[1];

    const startResizing = (e) => {
      switch (currentTargetClass) {
        case "box-handle--nw":
          box.style.top = getPositionValue('north', rect, originTop, e.clientY);
          box.style.left = getPositionValue('west', rect, originLeft, e.clientX);
          box.style.width = getSizeValue('-x', rect, originLeft, e.clientX);
          box.style.height = getSizeValue('+y', rect, originTop, e.clientY);
          break;
        case "box-handle--n":
          box.style.top = getPositionValue('north', rect, originTop, e.clientY);
          box.style.height = getSizeValue('+y', rect, originTop, e.clientY);
          break;
        case "box-handle--ne":
          box.style.top = getPositionValue('north', rect, originTop, e.clientY);
          box.style.width = getSizeValue('+x', rect, originLeft, e.clientX);
          box.style.height = getSizeValue('+y', rect, originTop, e.clientY);
          break;
        case "box-handle--e":
          box.style.width = getSizeValue('+x', rect, originLeft, e.clientX);
          break;
        case "box-handle--se":
          box.style.width = getSizeValue('+x', rect, originLeft, e.clientX);
          box.style.height = getSizeValue('-y', rect, originTop, e.clientY);
          break;
        case "box-handle--s":
          box.style.height = getSizeValue('-y', rect, originTop, e.clientY);
          break;
        case "box-handle--sw":
          box.style.left = getPositionValue('west', rect, originLeft, e.clientX)
          box.style.width = getSizeValue('-x', rect, originLeft, e.clientX);
          box.style.height = getSizeValue('-y', rect, originTop, e.clientY);
          break;
        case "box-handle--w":
          box.style.left = getPositionValue('west', rect, originLeft, e.clientX)
          box.style.width = getSizeValue('-x', rect, originLeft, e.clientX);
          break;
      }
    };

    const stopResizing = () => {
      document.removeEventListener("mousemove", startResizing);
      document.removeEventListener("mouseup", stopResizing);
    };

    document.addEventListener("mousemove", startResizing);
    document.addEventListener("mouseup", stopResizing);
  });
});
