export const getPostHandler = () => {
  return {
    name: "foo",
    title: "Sample post 1",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum feugiat nunc, id elementum nulla venenatis ut. Praesent non nunc ultrices, consequat arcu sit amet, auctor lacus. Maecenas libero sem, tincidunt ut sapien quis, elementum vehicula augue. Cras non cursus nulla. Suspendisse congue posuere accumsan. Vivamus ut sollicitudin ligula. In viverra tellus vel porttitor feugiat. Ut bibendum turpis sed mauris egestas ultricies.",
  };
};

export const listPostHandler = () => {
  return {
    posts: [
      {
        name: "foo",
        title: "Sample post 1",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc condimentum feugiat nunc, id elementum nulla venenatis ut. Praesent non nunc ultrices, consequat arcu sit amet, auctor lacus. Maecenas libero sem, tincidunt ut sapien quis, elementum vehicula augue. Cras non cursus nulla. Suspendisse congue posuere accumsan. Vivamus ut sollicitudin ligula. In viverra tellus vel porttitor feugiat. Ut bibendum turpis sed mauris egestas ultricies.",
      },
    ],
  };
};
