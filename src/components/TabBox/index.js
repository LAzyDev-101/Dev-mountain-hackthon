const TabBox = ({ value, index, children }) => {
  if (value !== index) return null;
  return children;
};

export default TabBox;
