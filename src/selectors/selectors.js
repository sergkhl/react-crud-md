export const groupsFormattedForDropdown = groups => {
  if (!groups) {
    return;
  }

  return groups.map(group => {
    return {
      value: group.id,
      text: `${group.name}`
    };
  });
};
