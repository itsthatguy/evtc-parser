import BaseEvent from './Base';

export default (encounter, properties: EventProperties) => {
  try {
    return new BaseEvent(properties);
    else throw new Error(`I DON'T KNOW WHAT THIS IS`);
  } catch (error) {
    console.error(error);
  }
};
