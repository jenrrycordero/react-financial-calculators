//const STATIC_COLORS = ["#8cb4d6", "#ffd24b", "#79b17d"];
const STATIC_COLORS = ["#17545e", "#79b17d"];

//const STATIC_COLORS = ["#0d4e78", "#79b17d"];

const getColorList = size => {
  const colors = [...STATIC_COLORS];

  for (let idx = 3; idx < size; idx += 1) {
    colors.push(`hsl(${Math.round(Math.random() * 360)}, 33%, 66%)`);
  }

  return colors.slice(0, size);
};

export default getColorList;