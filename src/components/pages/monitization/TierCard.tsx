import React, { useState } from "react";
import { Card, CardContent, Typography, Button, TextField, Grid, Switch, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

interface TierCardProps {
  tierName: string;
  tierSymbol: string;
  tierCost: number;
  tierDuration: string;
  tierPerks: string[];
  unavailablePerks: string[];
  isEditModeAtStart: boolean;
}

const TierCard: React.FC<TierCardProps> = ({
  tierName,
  tierSymbol,
  tierCost,
  tierDuration,
  tierPerks,
  unavailablePerks,
  isEditModeAtStart = false
}) => {
  const [isEditMode, setIsEditMode] = useState(isEditModeAtStart);
  const [editedCost, setEditedCost] = useState(tierCost);
  const [editedDuration, setEditedDuration] = useState(tierDuration);
  const [availableFeatures, setAvailableFeatures] = useState(tierPerks);

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  const handleSave = () => {
    // Save logic
    toggleEditMode();
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container spacing={2}>
          {/* Header with Tier Name and Symbol */}
          <Grid item xs={8}>
            <Typography variant="h5">
              {tierSymbol} {tierName}
            </Typography>
          </Grid>
          <Grid item xs={4} style={{ textAlign: "right" }}>
            <IconButton onClick={toggleEditMode}>
              {isEditMode ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          </Grid>

          {/* Cost and Duration */}
          <Grid item xs={12}>
            {isEditMode ? (
              <div>
                <TextField
                  label="Cost"
                  value={editedCost}
                  onChange={(e) => setEditedCost(Number(e.target.value))}
                />
                <TextField
                  label="Duration"
                  value={editedDuration}
                  onChange={(e) => setEditedDuration(e.target.value)}
                />
              </div>
            ) : (
              <Typography>
                Cost: ${tierCost} / {tierDuration}
              </Typography>
            )}
          </Grid>

          {/* Perks and Available Features */}
          <Grid item xs={12}>
            <Typography variant="h6">Perks</Typography>
            {tierPerks.map((perk, index) => (
              <Grid container key={index}>
                <Grid item xs={8}>
                  <Typography>{perk}</Typography>
                </Grid>
                <Grid item xs={4}>
                  {isEditMode && (
                    <Switch
                      checked={availableFeatures.includes(perk)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setAvailableFeatures([...availableFeatures, perk]);
                        } else {
                          setAvailableFeatures(availableFeatures.filter((p) => p !== perk));
                        }
                      }}
                    />
                  )}
                </Grid>
              </Grid>
            ))}

            {/* Unavailable Perks */}
            <Typography variant="h6" color="textSecondary">
              Unavailable Features
            </Typography>
            {unavailablePerks.map((perk, index) => (
              <Typography key={index} style={{ color: "gray" }}>
                {perk}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TierCard;
