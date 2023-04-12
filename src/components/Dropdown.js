import Select from "react-dropdown-select";

function Dropdown() {
  const options = [
    { id: "Red", name: 1 },
    { id: "Green", name: 2 },
    { id: "Blue", name: 3 },
    { id: "Yellow", name: 4 },
  ];
  return (
    <div>
      <div>
        <h4> react dropdown select</h4>
        <Select></Select>
      </div>
    </div>
  );
}
