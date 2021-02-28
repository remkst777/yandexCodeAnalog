import { TOKEN_METHODS } from '@/common/constants';

export const buildTree = (content = '', message) =>
  message.reduce(
    (acc, [currentCursorIndex, updatedCursorIndex, type, date, difference]) =>
      type === TOKEN_METHODS.ADD
        ? acc.slice(0, currentCursorIndex) +
          difference +
          acc.slice(currentCursorIndex, content.length)
        : acc.slice(0, currentCursorIndex) +
          acc.slice(currentCursorIndex + difference.length, content.length),
    content,
  );
