interface blog {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
}

interface blogConfig {
  blogs: blog[];
}

export const blogConfig: blogConfig = {
  blogs: [
    {
      title: 'React basic',
      href: '/blog/react-basic',
    },
    {
      title: 'React Component Lifecycle',
      href: '/blog/react-component-lifecycle',
    },
    {
      title: 'React Ref',
      href: '/blog/react-ref',
    },
    {
      title: 'Redux',
      href: '/blog/redux',
    },
  ],
};
