"use client";

import GridContainer from "@/app/components/gridContainer";
import SectionContainer from "@/app/components/sectionContainer";
import ExchangeMain from "@/app/components/exchange";

export default function Exchange() {
  return (
    <GridContainer>
      <SectionContainer
        heading="Exchange Currency"
        subheading="Convert between your different currency wallets"
      >
        <ExchangeMain />
      </SectionContainer>
    </GridContainer>
  );
}
