import constants as const

def split_chunks(message):
    chunks = []
    curr_line = []
    split_str = []
    substr = ""

    num_chars = 0
    for line in message:
        num_chars += (len(line) + 1)
        if num_chars < const.MAX_CHUNK_SIZE:
            curr_line.append(line)
        else:
            chunks.append(curr_line)
            if '\n' in line:
                split_str = line.split('\n')
                chunks.append([split_str[0]])
                curr_line = [split_str[1:]]

                for section in split_str[1:]:
                    num_chars += len(section)
            else:
                loc = line.rfind(' ')
                if 0 <= loc < const.MAX_CHUNK_SIZE:
                    chunks.append([line[:loc]])
                    curr_line = [line[loc:]]
                    split_chunks(curr_line)
                else:
                    chunks.append(line[:const.MAX_CHUNK_SIZE])
                    curr_line = [line[const.MAX_CHUNK_SIZE:]]
                    split_chunks(curr_line)
    chunks.append(curr_line)

    return chunks
