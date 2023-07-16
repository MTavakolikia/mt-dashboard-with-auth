import React, { useRef } from "react";
import { Product } from "../../../models/Product";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Theme,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

interface IAddOrEditComponentProps {
  product: Product;
  cancel: any;
  commit: any;
}

const colors = ["black", "red", "orange", "silver"];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddOrEdit = ({ product, cancel, commit }: IAddOrEditComponentProps) => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);
  const colorRef = useRef<HTMLInputElement | null>(null);
  const thumbnailRef = useRef<HTMLTextAreaElement | null>(null);

  const theme = useTheme();
  const [colorName, setColorName] = React.useState<string[]>([]);

  const save = () => {
    debugger;
    let item = { ...product };
    item.title = titleRef.current?.value!;
    item.price = priceRef.current?.value!;
    item.colors = colorName;
    item.thumbnail = thumbnailRef.current?.value!;
    commit(item);
  };

  function getStyles(name: string, personName: string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleChange = (event: SelectChangeEvent<typeof colorName>) => {
    const {
      target: { value },
    } = event;
    setColorName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div className="product-box">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Title :"
            variant="standard"
            defaultValue={product.title}
            inputRef={titleRef}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Price :"
            variant="standard"
            defaultValue={product.price}
            inputRef={priceRef}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ width: 200 }}>
            <InputLabel id="demo-multiple-name-label">Colors</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              defaultValue={product.colors}
              onChange={handleChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {colors.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, colorName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextareaAutosize
            aria-label="Thumbnail :"
            defaultValue={product.thumbnail}
            ref={thumbnailRef}
            style={{ width: 250 }}
          />
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" onClick={save}>
            <SaveIcon />
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => cancel(product?.id)}
          >
            <CloseIcon />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddOrEdit;
