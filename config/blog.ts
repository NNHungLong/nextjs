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
      title: 'React - basic concepts',
      href: '/blog/react-basic',
    },
    {
      title: 'React - Component Lifecycle',
      href: '/blog/react-component-lifecycle',
    },
    {
      title: 'React Hook: useState',
      href: '/blog/react-usestate',
    },
    {
      title: 'React Hook: useEffect',
      href: '/blog/react-useeffect',
    },
    {
      title: 'React Custom Hook: useRebounce',
      href: '/blog/react-customhook-userebound',
    },
    // {
    //   title: 'React Hook: useContext',
    //   href: '/blog/react-usecontext',
    // },
    {
      title: 'React Hook: useRef',
      href: '/blog/react-ref',
    },
    {
      title: 'React Hook: useReducer',
      href: '/blog/react-usereducer',
    },
    // {
    //   title: 'React Hook: useMemo',
    //   href: '/blog/react-usememo',
    // },
    {
      title: 'React Hook: useCallback',
      href: '/blog/react-usecallback',
    },
    // {
    //   title: 'React Hook: useLayoutEffect',
    //   href: '/blog/react-uselayouteffect',
    // },
    // {
    //   title: 'React Hook: build your own custom hook',
    //   href: '/blog/react-usecustomhook',
    // },
    {
      title: 'Redux',
      href: '/blog/redux',
    },
  ],
};
