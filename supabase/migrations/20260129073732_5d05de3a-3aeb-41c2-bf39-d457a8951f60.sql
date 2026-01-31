-- Create scores table for mythology guessing game
CREATE TABLE public.scores (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
        player_address TEXT NOT NULL,
            player_name TEXT,
                score INTEGER NOT NULL DEFAULT 0,
                    category TEXT NOT NULL DEFAULT 'Mythology',
                        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                            updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
                            );

                            -- Enable Row Level Security
                            ALTER TABLE public.scores ENABLE ROW LEVEL SECURITY;

                            -- Allow anyone to read scores (leaderboard is public)
                            CREATE POLICY "Scores are publicly readable" 
                            ON public.scores 
                            FOR SELECT 
                            USING (true);

                            -- Allow anyone to insert scores (game doesn't require auth)
                            CREATE POLICY "Anyone can submit scores" 
                            ON public.scores 
                            FOR INSERT 
                            WITH CHECK (true);

                            -- Create index on category and score for leaderboard queries
                            CREATE INDEX idx_scores_category_score ON public.scores (category, score DESC);

                            -- Create function to update timestamps
                            CREATE OR REPLACE FUNCTION public.update_updated_at_column()
                            RETURNS TRIGGER AS $$
                            BEGIN
                                NEW.updated_at = now();
                                    RETURN NEW;
                                    END;
                                    $$ LANGUAGE plpgsql SET search_path = public;

                                    -- Create trigger for automatic timestamp updates
                                    CREATE TRIGGER update_scores_updated_at
                                    BEFORE UPDATE ON public.scores
                                    FOR EACH ROW
                                    EXECUTE FUNCTION public.update_updated_at_column();