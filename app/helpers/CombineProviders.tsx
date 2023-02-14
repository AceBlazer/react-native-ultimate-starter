import React from 'react';

interface Props {
  providers: Array<
    React.JSXElementConstructor<any> & {
      prototype: {props: any};
    }
  >; //any because we don't care about props
  children: React.ReactNode;
}

export default function CombineProviders(props: Props) {
  const {providers = [], children} = props;

  return (
    <>
      {providers.reduceRight((acc, Provider) => {
        return <Provider {...Provider.prototype.props}>{acc}</Provider>;
      }, children)}
    </>
  );
}
