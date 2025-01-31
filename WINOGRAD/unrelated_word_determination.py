#%% our word lists

man = ['woman', 'husband', "uncle", "lady", "mouse", "male", "father", "strong", "friend", "beard", "person", "handsome"]
spider = ["web", "insect", "bug", "fright", "fly", "arachnid","crawl", "tarantula", "poison", "bite", "creepy", "animal"]
lion = ["tiger", "circus", "jungle", "tamer", "den", "cub", "africa", "mane", "cage", "feline", "roar", "fierce"]
cold = ["hot", "snow","warm", "winter", "ice","wet","frigid","chilly","heat","weather","freeze","air"]
shirt = ["blouse", "sleeves", "pants", "tie", "button", "shorts", "iron", "polo", "collar", "vest", "pocket", "jersey"]
black = ["white", "dark", "cat","charred","night","funeral","color","grief","blue","death","ink", "bottom"]
thief = ["steal","robber","crook","burglar","money","cop","bad","rob","jail","gun","villain","crime"]
fruit = ["apple","vegetable","orange","kiwi","citrus","ripe","pear","banana","berry","cherry","basket","juice"] 

#%%
import pandas as pd
import numpy as np

# Read the Excel file into a DataFrame
file_path = 'roediger_data.xlsx'
df = pd.read_excel(file_path)

# Define the list of items to exclude
exclude_items = ['man', 'spider', 'lion', 'cold', 'shirt', 'black', 'thief', 'fruit']

# Combine all exclusion lists into a single set to avoid duplicates
all_exclude_words = set(man + spider + lion + cold + shirt + black + thief + fruit + 
                        ["man", "spider", "lion", "cold", "shirt", "black", "thief", "fruit"])

# Filter out the rows that contain the unwanted items
filtered_df = df[~df['ITEM'].isin(exclude_items)]

# Group the DataFrame by the "Item" column
grouped_df = filtered_df.groupby('ITEM')['WORD'].apply(lambda x: x.head(12).tolist()).reset_index()

# Flatten the lists in the 'WORD' column into a single list
all_words = [word for sublist in grouped_df['WORD'] for word in sublist]

# Remove duplicates by converting the list to a set, then back to a list
unique_words = list(set(all_words))

print(unique_words)

# Randomly sample 96 words from the unique words
sample_size = 96
if len(unique_words) < sample_size:
    raise ValueError("Not enough unique words to sample the desired number of words.")
random_words = np.random.choice(unique_words, size=sample_size, replace=False)

# Convert the result to a DataFrame for better readability
random_words_df = pd.DataFrame(random_words, columns=['Random_Word'])

# Display the sampled words
print("Sampled Random Words:")
print(random_words_df)

# Save the sampled words to an Excel file
output_sample_file = 'sampled_random_words.xlsx'  # Replace with your desired output file name
random_words_df.to_excel(output_sample_file, index=False)

print(f"\nSampled random words saved to {output_sample_file}")
# %%
