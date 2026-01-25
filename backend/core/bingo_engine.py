import random
import math
from typing import List, Tuple, Set, Dict, Optional

def generate_bingo_blocks(
    songs: List[Tuple[str, str]], 
    num_participants: int, 
    rows: int, 
    columns: int
) -> List[List[Tuple[str, str]]]:
    """
    Generates unique bingo cards for a given number of participants.
    
    Args:
        songs: List of (song_name, artist_name) tuples.
        num_participants: Number of cards to generate.
        rows: Number of rows in the grid.
        columns: Number of columns in the grid.
        
    Returns:
        A list of cards, where each card is a list of song/artist tuples.
    """
    num_songs = len(songs)
    songs_per_card = rows * columns
    
    if num_songs < songs_per_card:
        raise ValueError(f"Not enough songs in playlist. Need at least {songs_per_card} for a {rows}x{columns} grid, but the playlist only has {num_songs}.")

    # Mathematical limit for unique cards: Combinations of num_songs taken songs_per_card at a time.
    # C(n, k) = n! / (k!(n-k)!)
    max_possible_unique = math.comb(num_songs, songs_per_card)
    
    if num_participants > max_possible_unique:
        raise ValueError(f"Impossible to generate {num_participants} unique cards with a {rows}x{columns} grid ({songs_per_card} songs) from a playlist of {num_songs} tracks. The mathematical maximum is {max_possible_unique} unique combinations.")

    blocks = []
    used_combinations: Set[Tuple[Tuple[str, str], ...]] = set()
    song_usage = {i: 0 for i in range(len(songs))}
    
    # Phase 1: Ensure every song is used at least once if possible
    # (If we have more slots than songs across all cards, this is trivial.
    # If we have many cards, we want to distribute songs evenly.)
    
    total_slots = num_participants * songs_per_card
    
    # Shuffle songs initially to avoid Bias
    shuffled_indices = list(range(len(songs)))
    random.shuffle(shuffled_indices)
    
    while len(blocks) < num_participants:
        # Try to pick songs that haven't been used much
        # We'll use a weighted choice or simply sort by usage
        
        # To ensure uniqueness, we might need multiple attempts
        attempts = 0
        while attempts < 100:
            attempts += 1
            
            # Selection strategy: 
            # 1. Take songs with zero usage first.
            # 2. Then take songs with minimum usage.
            # 3. Add some randomness to ensure different cards.
            
            candidates = sorted(range(len(songs)), key=lambda x: (song_usage[x], random.random()))
            current_indices = candidates[:songs_per_card]
            
            # Sort the combination to check for uniqueness in set
            combo = tuple(sorted([songs[i] for i in current_indices]))
            
            if combo not in used_combinations:
                used_combinations.add(combo)
                # Important: The actual card should be shuffled so songs don't always appear in the same order
                card = [songs[i] for i in current_indices]
                random.shuffle(card)
                blocks.append(card)
                
                # Update usage
                for i in current_indices:
                    song_usage[i] += 1
                break
        
        if attempts == 100:
            # If we can't find a unique combo after 100 attempts, we might have hit a limit
            # but with 9+ songs out of a playlist, uniqueness is usually easy.
            break

    return blocks
