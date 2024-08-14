import json

# Read the JSON file
with open('extracted_buttons.json', 'r') as file:
    data = json.load(file)

# Remove quotes from values
for key, value_list in data.items():
    data[key] = [value.strip('"') for value in value_list]

# Write the updated data back to the file
with open('extracted_buttons_no_quotes.json', 'w') as file:
    json.dump(data, file, indent=2)

print("Quotes removed successfully. Output saved to 'extracted_buttons_no_quotes.json'.")