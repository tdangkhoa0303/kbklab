import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {useTheme} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, {PropsWithChildren} from 'react';
import ReactMarkdown from 'react-markdown';
import {ReactMarkdownOptions} from 'react-markdown/lib/react-markdown';

export const GUIDE_FONT_SIZE = '18px';

export const CustomReactMarkdown: React.FC<PropsWithChildren<ReactMarkdownOptions>> = ({children, ...options}) => {
  const theme = useTheme();

  return (
    <ReactMarkdown
      {...options}
      components={{
        ul: List,
        li: (props) => <ListItem {...props} sx={{fontSize: GUIDE_FONT_SIZE, display: 'block'}} />,
        a: Link,
        img: (props) => <Box component="img" {...props} mb={2} sx={{width: '100%'}}/>,
        h3: (props) => (
          <Typography variant="h4" mb={1} {...props} />
        ),
        p: (props) => (
          <Typography sx={{
            fontSize: GUIDE_FONT_SIZE,
            lineHeight: theme.spacing(3.5),
            marginBottom: theme.spacing(1),
          }} {...props} />
        ),
        code: ({children, inline}) => (
          <Box
            component="code"
            sx={{
              display: inline ? 'inline-block' : 'flex',
              whiteSpace: inline ? 'nowrap' : 'break-spaces',
              borderRadius: theme.spacing(0.5),
              padding: theme.spacing(inline ? 0 : 1, 1),
              backgroundColor: '#efefef',
              margin: theme.spacing(inline ? 0 : 2, 0.5),
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 500,
            }}
          >{children}</Box>
        )
      }}
    >
      {children}
    </ReactMarkdown>
  )
}
