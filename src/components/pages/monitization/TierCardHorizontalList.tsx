import React, { useState } from "react";
import { Box, Button, Grid, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TierCard from "./TierCard"; // Assuming TierCard component exists

const TierCardHorizontalList: React.FC = () => {
  const initialTiers = [
    {
      tierName: "Basic",
      tierSymbol: "🔥",
      tierCost: 10,
      tierDuration: "Month",
      tierPerks: ["Feature A", "Feature B"],
      unavailablePerks: ["Feature C"],
    },
    {
      tierName: "Premium",
      tierSymbol: "🚀",
      tierCost: 30,
      tierDuration: "Month",
      tierPerks: ["Feature A", "Feature B", "Feature C"],
      unavailablePerks: ["Feature D"],
    },
  ];

  const [tiers, setTiers] = useState(initialTiers);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const addNewTier = () => {
    setTiers([
      ...tiers,
      {
        tierName: "",
        tierSymbol: "",
        tierCost: 0,
        tierDuration: "Month",
        tierPerks: [],
        unavailablePerks: [],
      },
    ]);
    setIsAddingNew(true); // Automatically open the newly added card in edit mode
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      {/* Render all TierCards in a row */}
      {tiers.map((tier, index) => (
        <Box key={index} sx={{ marginRight: 2 }}>
          <TierCard
            tierName={tier.tierName}
            tierSymbol={tier.tierSymbol}
            tierCost={tier.tierCost}
            tierDuration={tier.tierDuration}
            tierPerks={tier.tierPerks}
            unavailablePerks={tier.unavailablePerks}
            isEditModeAtStart={isAddingNew && index === tiers.length - 1} // Auto-enable edit mode for new card
          />
        </Box>
      ))}

      {/* Plus button at the end of the row */}
      <Box sx={{ alignSelf: "center" }}>
        <IconButton onClick={addNewTier} color="primary">
          <AddIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TierCardHorizontalList;
